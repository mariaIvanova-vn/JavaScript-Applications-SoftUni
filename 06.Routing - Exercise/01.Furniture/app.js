import page from '../node_modules/page/page.mjs';
import  {} from "../node_modules/lit-html/lit-html.js";

export const updateInfo = () =>{
    let userDiv = document.getElementById('user');
    let guestDiv = document.getElementById('guest');

    if(localStorage.length == 0){
        userDiv.style.display ='none';
        guestDiv.style.display = 'inline';
    }else{
        userDiv.style.display ='inline';
        guestDiv.style.display = 'none';
    }
}

updateInfo();
