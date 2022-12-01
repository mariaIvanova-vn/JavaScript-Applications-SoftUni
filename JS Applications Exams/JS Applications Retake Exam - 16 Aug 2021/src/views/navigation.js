import { logout } from "../api/user.js";
import { html, render, page } from "../exportsFrom.js";
import { getUserData } from "../utils.js";

const nav = document.querySelector('header');

const navTemplate = (hasUser) => html`
<h1><a class="home" href="/">GamesPlay</a></h1>
            <nav>
                <a href="/catalog">All games</a>

                ${!hasUser 
                    ? html` <div id="guest">
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
                </div>`
                    : html`<div id="user">
                    <a href="/create">Create Game</a>
                    <a @click=${logoutF} href="javascript:void(0)">Logout</a>
                </div>`}  
            </nav>`;

export function updateNav() {
    let user = getUserData();
    render(navTemplate(user), nav);
}

function logoutF(){
    logout();
    updateNav();
    page.redirect('/');
}