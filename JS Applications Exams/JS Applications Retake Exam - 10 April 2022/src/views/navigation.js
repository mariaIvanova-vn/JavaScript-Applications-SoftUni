import { logout } from "../api/user.js";
import { html, render, page } from "../exportsFrom.js";
import { getUserData } from "../utils.js";

const nav = document.querySelector('header');

const navTemplate = (loginUser) => html`
<h1><a href="/">Orphelp</a></h1>
            <nav>
                <a href="/catalog">Dashboard</a>
                ${!loginUser 
                    ? html`<div id="guest">
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
                </div>`
                    : html`<div id="user">
                    <a href="/myPosts">My Posts</a>
                    <a href="/create">Create Post</a>
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