import { html } from "../exportsFrom.js";
import { createSubmitHandler } from "../utils.js";
import { login } from "../api/user.js";
import { updateNav } from "./navigation.js";


const loginTemplate = (onLogin) => html`
<section id="loginaPage">
<form @submit=${onLogin} class="loginForm">
    <h2>Login</h2>
    <div>
        <label for="email">Email:</label>
        <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
    </div>
    <div>
        <label for="password">Password:</label>
        <input id="password" name="password" type="password" placeholder="********" value="">
    </div>

    <button class="btn" type="submit">Login</button>

    <p class="field">
        <span>If you don't have profile click <a href="/register">here</a></span>
    </p>
</form>
</section>
`;

export function showLogin(ctx) {
    ctx.render(loginTemplate(createSubmitHandler(onLogin)));

    async function onLogin({ email, password }) {
        if (email == '' || password == '') {
            return alert("All fields are need!");
        }
        await login(email, password);
        ctx.updateNav();
        ctx.page.redirect('/');
    }
}