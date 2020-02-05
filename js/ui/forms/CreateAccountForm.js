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
    Account.create(options.data, (err, response) => {
      if (!response.success) {
        return;
      }
      App.getWidget('accounts').update();
      this.element.reset();

      const modal = App.getModal('createAccount');
      modal.close();

      App.update();
    });
  }
}
