/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if(!element) {
      throw new Error('Передан пустой элемент');
    }
    this.element = element;
    this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render(this.lastOptions);
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    if (this.element.querySelector('.remove-account')) {
      let elRemoveAccount = this.element.querySelector('.remove-account');
      
      elRemoveAccount.addEventListener('click', event => {
        if (document.querySelector('.active')){
          let elRemThisAccount = document.querySelector('.active').dataset.id;
          event.preventDefault();
          this.removeAccount(elRemThisAccount);
        }
      });
    }

    if (document.querySelector('.transaction__remove')) {
      let elTransactionRemove = document.querySelector('.transaction__remove');
      
      elTransactionRemove.addEventListener('click', event => {
        event.preventDefault();
        this.removeTransaction(event.currentTarget.dataset.id);
      });
    }
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.update()
   * для обновления приложения
   * */
  removeAccount() {
    let elConfirm = confirm('Вы хотите удалить счёт?');

    if (elConfirm) {
      Account.remove(options, {}, (err, data) => {

        if(!err) {
        
          if(data.success) {
            this.clear();
            App.update();
          }
        }
      });
    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update()
   * */
  removeTransaction( id ) {
    if(id){
      let elConfirm = confirm('Вы действительно хотите удалить эту транзакцию?');

      if (elConfirm) {
        Transaction.remove(id, {}, (err, data) => {
          if(!err) {

            if(data.success) {
              App.update();
            }
          }
        });
      }
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render( options ) {
    if (options) {
      this.lastOptions = options;
      Account.get(options.account_id, {}, (err, data) => {

        if(!err) {
          this.renderTitle(data.data.name);
        }
      });

      Transaction.list(options, (err, data) => {
        if(!err) {

          if(data.success) {
            this.renderTransactions();
            this.renderTransactions(data.data);
          }
        }
      });
    }
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    document.querySelector('.content').innerHTML = '';
    this.renderTransactions();
    this.renderTitle('Название счёта');
    this.lastOptions = '';
  } 

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle( name ) {
    let elContentTitle = document.querySelector('.content-title');
    elContentTitle.textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate( date ) {
    let parseDate = new Date(date);
    let arrMonth = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
    let tDate, tMonth, tYear, tHours, tMinutes;
    
    tDate = parseDate.getDate() < 10 ? (`0${parseDate.getDate()}`) : parseDate.getDate();
    tMonth = arrMonth[parseDate.getMonth()];
    tYear = parseDate.getFullYear();
    tHours = parseDate.getHours() < 10 ? (`0${parseDate.getHours()}`) : parseDate.getHours();
    tMinutes = parseDate.getMinutes() < 10 ? (`0${parseDate.getMinutes()}`) : parseDate.getMinutes();

    return (`${tDate} ${tMonth} ${tYear} г. в ${tHours}:${tMinutes}`);
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML( item ) {
    let elTransaction = document.createElement('DIV');
    elTransaction.className = `transaction transaction_${item.type} row`;
    elTransaction.innerHTML = `
    <div class="col-md-7 transaction__details">
      <div class="transaction__icon">
          <span class="fa fa-money fa-2x"></span>
      </div>
      <div class="transaction__info">
          <h4 class="transaction__title">${item.name}</h4>
          <!-- дата -->
          <div class="transaction__date">${this.formatDate(item.created_at)}</div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="transaction__summ">
      <!--  сумма -->
          ${item.sum} <span class="currency">₽</span>
      </div>
    </div>
    <div class="col-md-2 transaction__controls">
        <!-- в data-id нужно поместить id -->
        <button class="btn btn-danger transaction__remove" data-id="${item.id}">
            <i class="fa fa-trash"></i>  
        </button>
    </div>
    `;
    
    elTransaction.querySelector('.transaction__remove').addEventListener('click', event => {
      event.preventDefault();
      this.removeTransaction(event.currentTarget.dataset.id);
    });

    return elTransaction;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions( data ) {
    let elContent = document.querySelector('.content');

    if (data) {
      for (let i = 0; i < data.length; i++) {
        elContent.insertAdjacentElement('beforeEnd', this.getTransactionHTML(data[i]));
      }
    } else {
      elContent.innerHTML = '';
    }
  }
}
