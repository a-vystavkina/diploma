/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  elDismissModal='';
  constructor( element ) {
    if(!element) {
      throw new Error( 'Элемент не существует' );
    }

    this.element = element;
    this.registerEvents();
  }

  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {
    this.onClose = this.onClose.bind(this);
    this.elDismissModal = this.element.querySelectorAll('[data-dismiss=modal]');

    for (let i = 0; i < this.elDismissModal.length; i++) {
      this.elDismissModal[i].addEventListener('click', this.onClose);
    }
    
    return this;
  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose( e ) {
    e.preventDefault();
    this.close();
  }
  /**
   * Удаляет обработчики событий
   * */
  unregisterEvents() {
    this.elDismissModal.removeEventListener('click', onClose);
    return this;
  }
  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {
    this.element.style.display = 'block';
    return this;
  }
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close(){
    this.element.style.removeProperty('display');
  }
}
