const preloader = document.querySelector('.preloader');

let url = window.location.toString();	

function checkUser(url) {
	return new Promise(function(resolve, reject) {
    	let name = url.split('=')[1];
 		if (name == undefined) {
			name = 'oliviia313';
		}
		resolve(name);
	})   
}
 
let getDate = new Promise ((resolve, reject) => {
	let date = new Date();
	let tdate = document.createElement('p');
 	tdate.innerHTML = date;
	setTimeout(() => (tdate ? resolve (tdate) : reject("Ошибка вычисления времени.")), 3000);
});

Promise.all([getDate])
	.then(setTimeout(() => preloader.classList.add('loaded_hiding'), 3000))
	.then(([tdate]) => document.body.append(tdate))
    checkUser(url).then((name) => fetch(`https://api.github.com/users/${name}`))
    .then(response => {
    	if (!response.ok) {
    	throw response
    	}
    	return response.json() 
    })
    .then((json) => { 
  		console.log(json.avatar_url);
		console.log(json.name);
		console.log(json.bio);
		console.log(json.html_url);

		let username = document.createElement('h2');
		if (json.name !== null) {
			username.innerHTML = json.name;
			document.body.append(username);
		} else {
			username.innerHTML = 'Имя пользователя недоступно';
		}
		username.addEventListener('click', () => location.assign(json.html_url));
		
		let userbio = document.createElement('p');
		if (json.bio !== null) {
			userbio.innerHTML = json.bio;
			document.body.append(userbio);
		} else {
			userbio.innerHTML = 'Описание профиля недоступно';
		}
		
		let img = new Image();
		img.src = json.avatar_url;
		document.body.append(img);
		img.onerror = () => document.body.innerHTML = 'Ошибка загрузки изображения';
	})
	.catch(error => document.body.innerHTML = 'Информация о пользователе недоступна');


	



			


