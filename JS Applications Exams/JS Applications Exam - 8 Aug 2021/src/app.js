//import { logout } from './api/user.js';
import {page, render} from "./exportsFrom.js";
import { updateNav } from './views/navigation.js';
import { getUserData } from './utils.js';
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";
import { showCatalog } from "./views/catalog.js";
import { showDetails } from "./views/details.js";
import { showCreate } from "./views/create.js";
import { showEdit } from "./views/edit.js";
import { showMyBooks } from "./views/myBooks.js";


const main=document.getElementById('site-content');
//document.getElementById('logoutBtn').addEventListener('click', onLogout)

page(decorateContext);

//page('/', ()=> console.log("home"));
//page('/home',()=> console.log("home"));
page('/login',showLogin);
page('/register',showRegister);
page('/catalog',showCatalog);
page('/details/:id',showDetails);
page('/create',showCreate);
page('/myBooks', showMyBooks);
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

