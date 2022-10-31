async function loadCommits() {
    let username = document.getElementById('username').value;
    let repo = document.getElementById('repo').value;
    let commits = document.getElementById('commits');
    try {
        const responce = await fetch(`https://api.github.com/repos/${username}/${repo}/commits`);

        if (responce.ok == false) {
            throw new Error(`Error: ${responce.status} (Not Found)`);
        }
        let data = await responce.json();
        for (const com of data) {
            let item = document.createElement('li');
            item.textContent = `${com.commit.author.name}: ${com.commit.message}`;
            commits.appendChild(item);
        }
    } catch (error) {
        console.log(error.message);
    }
}