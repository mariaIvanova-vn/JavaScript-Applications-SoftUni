import { logout } from './api/user.js';
import {page, render} from "./exportsFrom.js";
import { getUserData } from './utils.js';
import { showCatalog } from './views/catalog.js';
import { showCreate } from './views/create.js';
import { showHome } from './views/home.js';
import { showLogin } from './views/login.js';
import { updateNav } from './views/navigation.js';
import { showRegister } from './views/register.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';
import { showSearch } from './views/search.js';


const main=document.getElementById('main-content');
//document.getElementById('logoutBtn').addEventListener('click', onLogout)

page(decorateContext);

page('/', showHome);
page('/home',showHome);
page('/login',showLogin);
page('/register',showRegister);
page('/catalog', showCatalog);
page('/create',showCreate);
page('/details/:id', showDetails);
page('/edit/:id', showEdit);
page('/search',showSearch);



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

