/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */
class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if(!element) {
      throw new Error('Передан пустой элемент');
    } else {
      this.element = element;
      this.registerEvents();
      this.update();
      this.currentAccountId = null;  
    }
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    this.element.querySelector('.create-account')
    .addEventListener('click', (event) => {
      event.preventDefault();
      App.getModal('createAccount').open();
    });
    
    let elAccounts = this.element.querySelectorAll('.account');
    for (let i = 0; i < elAccounts.length; i++) {
      elAccounts[i].addEventListener('click', (event) => {
        event.preventDefault();
        this.onSelectAccount(event.target);
      });
    }
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    if (User.current()) {
      Account.list(User.current(), (err, data) => {

        if (data.success) {
          this.clear();
          for (let i = 0; i < data.data.length; i++) {
            this.renderItem(data.data[i]);
          }
        }
      });
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    let elAccounts = document.querySelectorAll('.account');
    for (let i = 0; i < elAccounts.length; i++) {
      elAccounts[i].outerHTML = '';
    }
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    if (document.querySelector('.active.account')) {
      document.querySelector('.active.account').classList.remove('active');
    }
    
    element.closest('.account').classList.add('active');
    this.currentAccountId = element.closest('.account').dataset.id;
    App.showPage('transactions', {account_id: this.currentAccountId});
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML( item ) {
    let elementAccount = document.createElement('li');
    elementAccount.className = 'account';
    elementAccount.dataset.id = item.id;
    elementAccount.innerHTML = `
      <a href = "#">
        <span>${item.name}</span>
        <span>${item.sum} ₽</span>
      </a>`;
      
    elementAccount.addEventListener('click', (event) => {
      event.preventDefault();
      this.onSelectAccount(event.target);
    });

    return elementAccount;
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem( item ) {
    this.element.insertAdjacentElement('beforeEnd', this.getAccountHTML(item));
  }
}
