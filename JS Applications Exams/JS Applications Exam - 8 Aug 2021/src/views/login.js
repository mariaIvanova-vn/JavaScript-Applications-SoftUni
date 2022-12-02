import { html } from "../exportsFrom.js";
import { createSubmitHandler } from "../utils.js";
import { login } from "../api/user.js";
import { updateNav } from "./navigation.js";


const loginTemplate = (onLogin) => html`
<section id="login-page" class="login">
<form @submit=${onLogin} id="login-form" action="" method="">
    <fieldset>
        <legend>Login Form</legend>
        <p class="field">
            <label for="email">Email</label>
            <span class="input">
                <input type="text" name="email" id="email" placeholder="Email">
            </span>
        </p>
        <p class="field">
            <label for="password">Password</label>
            <span class="input">
                <input type="password" name="password" id="password" placeholder="Password">
            </span>
        </p>
        <input class="button submit" type="submit" value="Login">
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
        ctx.page.redirect('/catalog');
    }
}