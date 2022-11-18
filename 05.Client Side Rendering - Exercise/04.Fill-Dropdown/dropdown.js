import { html, render } from "../node_modules/lit-html/lit-html.js";

async function getAllItems() {
    const response = await fetch('http://localhost:3030/jsonstore/advanced/dropdown');
    let data = await response.json();
    return data;
}

let items = Object.values(await getAllItems());

let template = html`${items.map((x) => html`<option value=${x._id}>${x.text}</option>`)}`;
let main = document.getElementById('menu');
render(template, main);

document.querySelector('input[type="submit"]').addEventListener('click', addItem);

async function addItem(e) {
    e.preventDefault();
    let text = document.querySelector('#itemText').value;
    let response = await fetch('http://localhost:3030/jsonstore/advanced/dropdown', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
    })
    let data = await response.json();
    items.push(data);
    if (response.ok) {
        let template = html`${items.map((x) => html`<option value=${x._id}>${x.text}</option>`)}`;
        render(template,main)
    }
} 