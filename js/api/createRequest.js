/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const f = function () {},
    { method = 'GET',
      headers = {},
      success = f,
      error = f,
      callback = f,
      responseType,
      async = true,
      data = {}} = options,
    xhr = new XMLHttpRequest;

  let {url} = options;

  if (responseType) {
    xhr.responseType = responseType;
  }

  xhr.onload = function() {
    success.call(this, xhr.response);
    callback.call(this, null, xhr.response);
  };
  xhr.onerror = function() {
    console.log('!!!');
    const err = new Error('Request Error');
    error.call(this, err);
    callback.call(this, err);
  };

  xhr.withCredentials = true;

  let requestData;

  if (method === 'GET') {
    const urlParams = Object.entries( data )
      .map(([key, value]) => `${key}=${value}` )
      .join('&');
    if (urlParams) {
      url += '?' + urlParams;
    }
  }
  else {
    requestData = Object.entries(data)
      .reduce(( target, [key, value]) => {
        target.append(key, value);
        return target;
      }, new FormData);
  }
  try {
    xhr.open(method, url);
    xhr.send(requestData);
  }
  catch ( err ) {
    error.call(this, err);
    callback.call(this, err);
    return xhr;
  }

  return xhr;
  };