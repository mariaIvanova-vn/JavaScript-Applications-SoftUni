import {html, render} from "../node_modules/lit-html/lit-html.js";
import {towns} from "./towns.js";

let template = html `
<ul>
${towns.map(town=>{
  return html `<li id=${town}>${town}</li>`
})}
</ul>
`;

let root = document.getElementById('towns');
render(template, root);

document.querySelector('button').addEventListener('click', search);

function search() {
   let text = document.getElementById('searchText').value;
   let resultHtml=document.getElementById('result');
   let count=0;
   let result = towns.filter(t=>{
      if(t.includes(text)){
         let match=document.getElementById(`${t}`);
         match.setAttribute('class', 'active');
         count++;
         return t;
      }else{
         let match=document.getElementById(`${t}`);
         match.setAttribute('class', 'none');
         return t;
      }
   });
   
   resultHtml.textContent=`${count} matches found`;
}
