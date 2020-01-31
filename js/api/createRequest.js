/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}, callback) => {
  let xhr = new XMLHttpRequest;
	let method = options.method;
	let url;
	let formData;

	if (method === 'GET') {
    
    if(options.data) {
    	let urlOption = Object.entries(options.data)
    	.map(([key, value]) => `${key}=${value}`)
    	.join('&');
    	url = `${options.url}?${urlOption}`;
    }

  } else {
  	formData = new FormData();
		url = options.url;
		
		for (let item in options.data) {
			formData.append(item, options.data[item]);
		}
	}

	xhr.addEventListener('readystatechange', function () {
		if(this.readyState == xhr.DONE) {
			if (this.status == 200) {
				callback(null, JSON.parse(this.responseText));
			} else {
				callback(this.responseType, null);
			}
		}
	});

	try {
		xhr.withCredentials = true;
		xhr.open(method, url);

		if (formData != undefined) {
			xhr.send(formData);
		} else {
			xhr.send();
		}		
	}
	catch (e) {
		console.log(e);
		callback(e);
	}
};

