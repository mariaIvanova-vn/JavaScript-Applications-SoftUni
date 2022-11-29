import { html } from "../exportsFrom.js";
import { createSubmitHandler } from "../utils.js";
import { login } from "../api/user.js";
import { updateNav } from "./navigation.js";


const loginTemplate = (onLogin) => html`
<section id="loginPage">
<form @submit=${onLogin}>
    <fieldset>
        <legend>Login</legend>

        <label for="email" class="vhide">Email</label>
        <input id="email" class="email" name="email" type="text" placeholder="Email">

        <label for="password" class="vhide">Password</label>
        <input id="password" class="password" name="password" type="password" placeholder="Password">

        <button type="submit" class="login">Login</button>

        <p class="field">
            <span>If you don't have profile click <a href="/register">here</a></span>
        </p>
    </fieldset>
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