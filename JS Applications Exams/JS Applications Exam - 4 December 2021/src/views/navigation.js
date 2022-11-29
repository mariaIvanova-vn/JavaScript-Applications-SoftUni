import { logout } from "../api/user.js";
import { html, render, page } from "../exportsFrom.js";
import { getUserData } from "../utils.js";

const nav = document.getElementById('nav');

const navTemplate = (loginUser) => html`
<img src="./images/headphones.png">
                <a href="/">Home</a>
                <ul>
                    <!--All user-->
                    <li><a href="/catalog">Catalog</a></li>
                    <li><a href="/search">Search</a></li>
                    ${!loginUser 
                        ? html`<li><a href="/login">Login</a></li>
                        <li><a href="/register">Register</a></li>`
                        : html`<li><a href="/create">Create Album</a></li>
                        <li><a @click=${logoutF} href="javascript:void(0)">Logout</a></li>`}                  
                </ul>
`;

export function updateNav() {
    let user = getUserData();
    render(navTemplate(user), nav);
}

function logoutF(){
    logout();
    updateNav();
    page.redirect('/');
}