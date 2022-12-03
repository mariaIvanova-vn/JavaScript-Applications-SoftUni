import { deleteByIde, getById } from "../api/data.js";
import { addLike, getLikes, getOwnLikes } from "../api/likes.js";
import { html, page, nothing } from "../exportsFrom.js";

const detailsTemplate = (item,likes,  isUser, canLike, isOwner, onDelete, onLike) => html`
<section id="details">
<div id="details-wrapper">
  <p id="details-title">Album Details</p>
  <div id="img-wrapper">
    <img src="${item.imageUrl}" alt="example1" />
  </div>
  <div id="info-wrapper">
    <p><strong>Band:</strong><span id="details-singer">${item.singer}</span></p>
    <p>
      <strong>Album name:</strong><span id="details-album">${item.album}</span>
    </p>
    <p><strong>Release date:</strong><span id="details-release">${item.release}</span></p>
    <p><strong>Label:</strong><span id="details-label">${item.label}</span></p>
    <p><strong>Sales:</strong><span id="details-sales">${item.sales}</span></p>
  </div>
  <div id="likes">Likes: <span id="likes-count">${likes}</span></div>

  ${controls(item, isUser,canLike, isOwner, onDelete, onLike)}  
</div>
</section>`;

function controls(item, isUser, canLike, isOwner, onDelete, onLike){
  if(isUser==false){
      return nothing;
  }
  if(canLike){
      return html`<div id="action-buttons">
      <a  @click=${onLike} href="#" id="like-btn">Like</a>          
      </div>`;
  }
  if(isOwner){
      return html`<div id="action-buttons">       
      <a href="/edit/${item._id}" id="edit-btn">Edit</a>
      <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>         
      </div>`;
  }
}




export async function showDetails(ctx) {
  const id = ctx.params.id;

  const request=[
      getById(id),
      getLikes(id)
  ];
  const isUser = Boolean(ctx.user);
  if(isUser){
      request.push(getOwnLikes(id,ctx.user._id));
  }
  const [item, likes, hasLikes] = await Promise.all(request);
  
  const isOwner = isUser && ctx.user._id == item._ownerId;
  const canLike= !isOwner &&  hasLikes==0;

  ctx.render(detailsTemplate(item, likes, isUser, canLike, isOwner, onDelete, onLike));

  async function onDelete() {
    const choice = confirm("Are you sure?");
    if (choice) {
      await deleteByIde(id);
      ctx.page.redirect('/catalog');
    }
  }
  async function onLike(e){
    e.preventDefault();
    await addLike(id)
    ctx.page.redirect(`/details/${item._id}`);     
  }
}