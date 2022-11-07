async function solve() {
    const form = document.getElementById('form');
    const table = document.querySelector('tbody');
    const url = 'http://localhost:3030/jsonstore/collections/students';

    form.addEventListener('submit', onSubmit);

    table.innerHTML = '';
    let response = await fetch(url);
    let result = await response.json();

    let allStudents = Object.values(result);

    allStudents.forEach(x => {
        let row = document.createElement('tr');

        for (let data in x) {
            if (data == '_id') {
                continue;
            }
            let cell = document.createElement('td');
            cell.textContent = x[data];
            row.appendChild(cell);
        }
        table.appendChild(row);
    });

    async function onSubmit(event) {
        event.preventDefault();

        let data = new FormData(form)
        let student = Object.fromEntries(data.entries());

        if (Object.values(student).includes('')) {
            return;
        }

        await fetch(url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(student)
        });
    }
}

solve()