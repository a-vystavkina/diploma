/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство HOST, равно значению Entity.HOST.
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    if(localStorage.getItem('user')) {
      localStorage.removeItem('user');
    }
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    return JSON.parse(localStorage.getItem('user'));
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch( data, callback = f => f ) {
    if (data) {
      let url = this.URL + '/current';
      const xhr = createRequest(Object.assign({url: this.HOST + url, method: 'GET'}, {data}), (err, data) => {
        if(!err) {
          if(data.success) {
            this.setCurrent({id: data.user.id, name: data.user.name, email: data.user.email});
          } else {
            this.unsetCurrent();
          }
        }
        callback(err, data);
      });
    }
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login( data, callback = f => f ) {
    let url = this.URL + '/login';
    const xhr = createRequest(Object.assign({url: this.HOST + url, method: 'POST'}, data), (err, data) => {
      
      if(!err) {
        
        if(data.success) {
          this.setCurrent({id: data.user.id, name: data.user.name, email: data.user.email});
        }
      }
      callback(err, data);
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback = f => f ) {
    let url = this.URL + '/register';
    const xhr = createRequest(Object.assign({url: this.HOST + url, method: 'POST'}, data), (err, data) => {

      if(!err) {

        if(data.success) {
          this.setCurrent({id: data.user.id, name: data.user.name, email: data.user.email});
        }
      }
      callback(err, data);
    });
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback = f => f ) {
  let url = this.URL + '/logout';
    const xhr = createRequest(Object.assign({url: this.HOST + url, method: 'POST'}, data), (err, data) => {

      if(!err) {
        if(data.success) {
          this.unsetCurrent();
          App.setState('init');
        }
      }
      callback(err, data);
    });
  }
}

User.HOST = Entity.HOST;
User.URL = '/user';
