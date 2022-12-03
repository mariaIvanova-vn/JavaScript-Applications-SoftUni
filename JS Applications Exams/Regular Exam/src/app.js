//import { logout } from './api/user.js';
import {page, render} from "./exportsFrom.js";
import { updateNav } from './views/navigation.js';
import { getUserData } from './utils.js';
import { showHome } from "./views/home.js";
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";
import { showCatalog } from "./views/catalog.js";
import { showAdd } from "./views/add.js";
import { showDetails } from "./views/details.js";
import { showEdit } from "./views/edit.js";

//import { showDetails } from './views/details.js';
//import { showEdit } from './views/edit.js';

const main=document.getElementById('mainId');

page(decorateContext);

page('/', showHome);
page('/home',showHome);
page('/login',showLogin);
page('/register', showRegister);
page('/catalog',showCatalog);
page('/addAlbum',showAdd);
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

