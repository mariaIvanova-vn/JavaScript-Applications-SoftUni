import { deleteByIde, getById } from "../api/data.js";
import { html, page, nothing } from "../exportsFrom.js";

const detailsTemplate = (item, user, onDelete) => html`
<section id="details-page">
<h1 class="title">Post Details</h1>

<div id="container">
    <div id="details">
        <div class="image-wrapper">
            <img src="${item.imageUrl}" alt="Material Image" class="post-image">
        </div>
        <div class="info">
            <h2 class="title post-title">${item.title}</h2>
            <p class="post-description">Description: ${item.description}</p>
            <p class="post-address">Address: ${item.address}</p>
            <p class="post-number">Phone number: ${item.phone}</p>
            <p class="donate-Item">Donate Materials: 0</p>
            
            ${user && user._id == item._ownerId ? html`<div class="btns">
            <a href="/edit/${item._id}" class="edit-btn btn">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)"  class="delete-btn btn">Delete</a>
                <!--Bonus - Only for logged-in users ( not authors )-->
                <a href="#" class="donate-btn btn">Donate</a></div>`
        : nothing}
             
            
        </div>
    </div>
</div>
</section>`;

export async function showDetails(ctx) {
    const id = ctx.params.id;
    const item = await getById(id);
   // const isCreator = ctx.user._id == item._ownerId;
    ctx.render(detailsTemplate(item,ctx.user, onDelete));

    async function onDelete(){
        const choice = confirm("Are you sure?");
        if(choice){
            await deleteByIde(id);
            ctx.page.redirect('/catalog');
        }
    }
}