import "./src/api/api.js";

let main=document.querySelector('main');

let ctx={
    showSection
}

function showSection(name){
    main.replaceChildren(name);
}

showSection(ctx);