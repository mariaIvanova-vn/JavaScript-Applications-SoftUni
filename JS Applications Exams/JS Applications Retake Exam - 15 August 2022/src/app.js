import { logout } from './api/user.js';
import {page, render} from "./exportsFrom.js";
import { updateNav } from './views/navigation.js';
import { getUserData } from './utils.js';
import { showHome } from './views/home.js';
import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';
import { showCatalog } from './views/catalog.js';
import { showAdd } from './views/add.js';
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
page('/search', showSearch);
page('/edit/:id',showEdit);
page('/add',showAdd);
page('/details/:id', showDetails);


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

