/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor( element ) {
    super(element);
    this.element = element;
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    let elSelect = this.element.querySelector('.accounts-select');
    let elOPtions;

    if (User.current()) {
      Account.list(User.current(), (err, data) => {

        if (data.success) {

          for (let i = 0; i < data.data.length; i++) {
            let datItem = data.data[i];
            elOPtions += `
              <option value="${datItem.id}">${datItem.name}</option>
            `;
          }
          elSelect.innerHTML = elOPtions;
        }
      });
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit( options ) {
    Transaction.create(options, (err, data) => {

      if (data.success) {
        this.element.reset();

        let modal = new Modal(this.element.closest('.modal'));
        modal.close();

        App.update();
      } else {
        alert(response.error);
        return;
      }
    });
  }
}
