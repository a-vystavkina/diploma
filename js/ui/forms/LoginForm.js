/**
 * Класс LoginForm управляет формой
 * входа в портал
 * Наследуется от AsyncForm
 * */
class LoginForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit( options ) {
    User.login(options, (err, data) => {
      if (data.success) {
        this.element.reset();
        App.setState('user-logged');

        let modal = new Modal(this.element.closest('.modal'));
  	      modal.close();
  		} else {
  		  alert(data.error);
  		  return;
  		}
  	});
  }
}
