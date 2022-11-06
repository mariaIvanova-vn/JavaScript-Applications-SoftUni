function attachEvents() {
    document.getElementById('submit').addEventListener('click', addComment)
    document.getElementById('refresh').addEventListener('click', displayComment);
}

let url = `http://localhost:3030/jsonstore/messenger`;
let displayArea = document.getElementById('messages');

async function addComment() {
    let author = document.querySelector('[name="author"]').value;
        let content = document.querySelector('[name="content"]').value;

        await fetch(url, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({author, content})
        })
        console.log(author, content);
}

async function displayComment() {
    let response = await fetch(url);
        let data = await response.json();
        let output = [];
        
        for (const message of Object.values(data)) {
            output.push(`${message.author}: ${message.content}`);
        }
        displayArea.value = output.join('\n');
        console.log(data);
}

attachEvents();