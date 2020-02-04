/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * Наследуется от AsyncForm
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно (в котором находится форма) в случае успеха,
   * а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit( options ) {
    Account.create(options, (err, data) => {
      if (data.success) {
        this.element.reset();
        App.update();

        let modal = new Modal(this.element.closest('.modal'));
  			modal.close();
      }else {
         alert(response.error);
         return;
  	    }
  	});
  }
}
