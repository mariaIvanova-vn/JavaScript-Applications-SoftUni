function loadRepos() {
	let userName = document.getElementById('username').value;

	fetch(`https://api.github.com/users/${userName}/repos`)
		.then(handleResponse)
		.then(handleData)
		.catch(handleError);
}

function handleResponse(response) {
	if (response.ok == false) {
		throw new Error(`Error: ${response.status} ${response.statusText}`);
	}
	return response.json();
}

function handleData(data) {
	let list = document.getElementById('repos');

	let items = data.map(repo => {
		let li = document.createElement('li');
		let a = document.createElement('a');
		a.href = repo.html_url;
		a.textContent = repo.full_name;
		li.appendChild(a);

		return li;
	})
	list.replaceChildren(...items);
}

function handleError(error) {
	let list = document.getElementById('repos');
	list.textContent=error.message;
}