import {html, render} from './node_modules/lit-html/lit-html.js';

document.getElementById('btnLoadTowns').addEventListener('click', (event)=>{
    event.preventDefault();
    let input = document.getElementById('towns').value;

    let towns = input.split(', ');
    let template=html`
    <ul>
    ${towns.map(element => html`<li>${element}</li>`)}
    </ul>
    `;
    let root=document.getElementById('root');

    render(template,root);
})