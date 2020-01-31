/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * Имеет свойство HOST, равно 'https://bhj-diplom.letsdocode.ru'.
 * */
class Entity {

  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list( data, callback = f => f ) {
    let xhr = createRequest(Object.assign({url: this.HOST + this.URL, method: 'GET'}, {data}),(err, data) => {
      callback(err, data);
    });
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create( data, callback = f => f ) {
    data = Object.assign({_method: 'PUT'}, data);
    const xhr = createRequest(Object.assign({url: this.HOST + this.URL, method: 'POST'}, data), (err, data) => {
      callback(err, data);
    });
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get( id = '', data, callback = f => f ) {
    data = Object.assign({id}, data);
    const xhr = createRequest(Object.assign({url: this.HOST + this.URL, method: 'GET'}, {data}), (err, data) => {
      callback(err, data);
    });
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove( id = '', data, callback = f => f ) {
    data = Object.assign({id}, {_method: 'DELETE'}, data);
    const xhr = createRequest(Object.assign({url: this.HOST + this.URL, method: 'POST'}, {data}), (err, data) => {
      callback(err, data);
    });
  }
}

Entity.HOST = 'https://bhj-diplom.letsdocode.ru/user/';
Entity.URL = '';

