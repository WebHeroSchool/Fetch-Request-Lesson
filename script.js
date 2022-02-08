let url = window.location.toString();

function checkUser(url) {
	let newString = url.split('=');
	let name = newString[1];
	if (name == undefined) {
		name = 'oliviia313';
	}
	return name;
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

fetch(`https://api.github.com/users/${checkUser(url)}`)
	.then(handleErrors)
	.then(response => response.json())
	.then(json => {
		console.log(json.avatar_url);
		console.log(json.name);
		console.log(json.bio);
		console.log(json.html_url)

		let username = document.createElement('h2');
		if (json.name !== null) {
			username.innerHTML = json.name;
			document.body.append(username);
		} else {
			username.innerHTML = 'Имя пользователя недоступно';
		}
		username.addEventListener('click', () => location.assign(json.html_url));
		username.style.cursor = "pointer";

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



			


