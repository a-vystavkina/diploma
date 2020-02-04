/**
 * Класс RegisterForm управляет формой
 * регистрации
 * Наследуется от AsyncForm
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit( options ) {
  	User.register(options, (err, data) => {
  		if (response.success) {
  		  this.element.reset();
  			
        App.setState('user-logged');
  		  let modal = new Modal(this.element.closest('.modal'));
  		  modal.close();
        		
  		} else {
  		    alert(response.error);
  			return;
  		}
  	});
  }
}
