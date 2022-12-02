import { logout } from "../api/user.js";
import { html, render, page } from "../exportsFrom.js";
import { getUserData } from "../utils.js";

const nav = document.getElementById('site-header')

const navTemplate = (loginUser) => html`
<nav class="navbar">
                <section class="navbar-dashboard">
                    <a href="/catalog">Dashboard</a>

                    ${!loginUser 
                        ? html`<div id="guest">
                        <a class="button" href="/login">Login</a>
                        <a class="button" href="/register">Register</a>
                    </div>`
                        : html`<div id="user">
                        <span>Welcome, ${loginUser.email}</span>
                        <a class="button" href="/myBooks">My Books</a>
                        <a class="button" href="/create">Add Book</a>
                        <a @click=${logoutF} class="button" href="javascript:void(0)">Logout</a>
                    </div>`}
                </section>
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