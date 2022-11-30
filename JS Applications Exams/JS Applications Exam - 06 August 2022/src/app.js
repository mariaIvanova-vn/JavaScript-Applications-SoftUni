import { logout } from './api/user.js';
import {page, render} from "./exportsFrom.js";
import { updateNav } from './views/navigation.js';
import { getUserData } from './utils.js';
import { showHome } from './views/home.js';
import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';
import { showCatalog } from './views/catalog.js';
import { showAdd } from './views/create.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';


const main=document.getElementById('main-content');
//document.getElementById('logoutBtn').addEventListener('click', onLogout)

page(decorateContext);

page('/', showHome);
page('/home',()=> showHome);
page('/login',showLogin);
page('/register',showRegister);
page('/catalog',showCatalog);
page('/create',showAdd);
page('/details/:id',showDetails);
page('/edit/:id',showEdit);

updateNav();
page.start();

function decorateContext(ctx, next){
    ctx.render = renderMain;
    ctx.updateNav=updateNav;

    let user=getUserData();
    if(user){
        ctx.user=user;
    }
    next();
}

function renderMain(content){
    render(content, main);
}

