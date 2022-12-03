import { logout } from "../api/user.js";
import { html, render, page } from "../exportsFrom.js";
import { getUserData } from "../utils.js";

const nav = document.querySelector('header');

const navTemplate = (loginUser) => html`
<a id="logo" href="/"><img id="logo-img" src="./images/logo.png" alt="" /></a>
      <nav>
        <div>
          <a href="/catalog">Dashboard</a>
        </div>
        ${!loginUser 
            ? html`<div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </div>`
            : html`<div class="user">
            <a href="/addAlbum">Add Album</a>
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