import { apply, getApply, getOwnApply } from "../api/apply.js";
import { deleteByIde, getById } from "../api/data.js";
import { html, page, nothing } from "../exportsFrom.js";

const detailsTemplate = (item,applys, isUser, canApply, isOwner, onDelete, onApply) => html`
<section id="details">
<div id="details-wrapper">
  <img id="details-img" src="${item.imgUrl}" />
  <p id="details-title">${item.title}</p>
  <p id="details-category">
    Category: <span id="categories">${item.category}</span>
  </p>
  <p id="details-salary">
    Salary: <span id="salary-number">${item.salary}</span>
  </p>
  <div id="info-wrapper">
    <div id="details-description">
      <h4>Description</h4>
      <span>${item.description}</span
      >
    </div>
    <div id="details-requirements">
      <h4>Requirements</h4>
      <span>${item.requirements}</span
      >
    </div>
  </div>
  <p>Applications: <strong id="applications">${applys}</strong></p>
  ${applyControls(item, isUser, canApply, isOwner, onDelete, onApply)}
     
</div>
</section>
`;



function applyControls(item, isUser, canApply, isOwner, onDelete, onApply){
  if(isUser==false){
      return nothing;
  }
  if(canApply){
      return html`<a @click=${onApply} href="javascript:void(0) id="apply-btn">Apply</a>`;
  }
  if(isOwner){
      return html`
      <div id="action-buttons">
    <a href="/edit/${item._id}" id="edit-btn">Edit</a>
    <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
    </div>`;
  }
}

export async function showDetails(ctx) {
    const id = ctx.params.id;
    const request=[
      getById(id),
      getApply(id)
  ];
  const isUser = Boolean(ctx.user);
  if(isUser){
      request.push(getOwnApply(id,ctx.user._id));
  }
  const [item, applys, hasApply] = await Promise.all(request);
  
  const isOwner = isUser && ctx.user._id == item._ownerId;
  const canApply= !isOwner &&  hasApply==0;
  ctx.render(detailsTemplate(item,applys, isUser, canApply, isOwner, onDelete, onApply));

    async function onDelete(){
        const choice = confirm("Are you sure?");
        if(choice){
            await deleteByIde(id);
            ctx.page.redirect('/catalog');
        }
    }
    async function onApply(){
      await apply(id);
      ctx.page.redirect('/catalog/' + id);
  }
}