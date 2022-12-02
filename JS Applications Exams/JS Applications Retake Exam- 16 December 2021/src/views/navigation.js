import { logout } from "../api/user.js";
import { html, render, page } from "../exportsFrom.js";
import { getUserData } from "../utils.js";

const nav = document.querySelector('nav');

const navTemplate = (loginUser) => html`
<a href="/">Theater</a>
                <ul>
                ${!loginUser 
                    ? html`<li><a href="/login">Login</a></li>
                    <li><a href="/register">Register</a></li>`
                    : html`<li><a href="/profilePage">Profile</a></li>
                    <li><a href="/create">Create Event</a></li>
                    <li><a @click=${logoutF} href="javascript:void(0)">Logout</a></li>`}                  
                </ul>`;

export function updateNav() {
    let user = getUserData();
    render(navTemplate(user), nav);
}

function logoutF(){
    logout();
    updateNav();
    page.redirect('/');
}