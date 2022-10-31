async function loadRepos() {
	const username = document.getElementById('username').value;
	const list = document.getElementById('repos');

	try {
		const response = await fetch(`https://api.github.com/users/${username}/repos`);

		if (response.ok == false) {
			console.log(response);
			throw new Error(`${response.status} ${response.statusText}`);
		}
		const data = await response.json();

		list.innerHTML = '';

		for (const repo of data) {
			let item = document.createElement('li');
			let anchor = document.createElement('a');
			anchor.href = repo.html_url;
			anchor.target = '_blank';
			anchor.textContent = repo.full_name;

			item.appendChild(anchor);

			list.appendChild(item);
		} 
	} catch (err) {
		list.innerHTML = '';
		let item = document.createElement('li');
		item.textContent = err.message;
		list.appendChild(item);
	}
}

//function loadRepos() {
//	let userName = document.getElementById('username').value;
//
//	fetch(`https://api.github.com/users/${userName}/repos`)
//		.then(handleResponse)
//		.then(handleData)
//		.catch(handleError);
//}
//
//function handleResponse(response) {
//	if (response.ok == false) {
//		throw new Error(`Error: ${response.status} ${response.statusText}`);
//	}
//	return response.json();
//}
//
//function handleData(data) {
//	let list = document.getElementById('repos');
//
//	let items = data.map(repo => {
//		let li = document.createElement('li');
//		let a = document.createElement('a');
//		a.href = repo.html_url;
//		a.textContent = repo.full_name;
//		li.appendChild(a);
//
//		return li;
//	})
//	list.replaceChildren(...items);
//}
//
//function handleError(error) {
//	let list = document.getElementById('repos');
//	list.textContent=error.message;
//}