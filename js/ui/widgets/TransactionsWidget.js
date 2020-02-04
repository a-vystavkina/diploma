/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */
class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (element) {
      this.element = element;
      this.registerEvents();
    } else
     {
       throw new Error('Элемент не найден');
     }
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const createIncomeButton = this.element.querySelector( '.create-income-button' );
    const createExpenseButton = this.element.querySelector( '.create-expense-button' );
    const incomeModal = new Modal( document.querySelector( '#modal-new-income' ));
    const expenseModal = new Modal( document.querySelector( '#modal-new-expense' ));

    createIncomeButton.addEventListener( 'click', () => incomeModal.open());
    createExpenseButton.addEventListener( 'click', () => expenseModal.open())
  }
}
