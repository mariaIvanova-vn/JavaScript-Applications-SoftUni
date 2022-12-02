import { addLike, deleteByIde, getById, getLikes, getUserLikes } from "../api/data.js";
import { html, page, nothing } from "../exportsFrom.js";

const detailsTemplate = (item, user, onLike, onDelete, userLikes, countLikes) => html`
<section id="detailsPage">
<div id="detailsBox">
    <div class="detailsInfo">
        <h1>Title: ${item.title}</h1>
        <div>
            <img src="${item.imageUrl}" />
        </div>
    </div>

    <div class="details">
        <h3>Theater Description</h3>
        <p>${item.description}</p>
        <h4>Date: ${item.date}</h4>
        <h4>Author: ${item.author}</h4>
        <div class="buttons">
        ${user?._id == item._ownerId ? html`
        <a class="btn-delete" @click=${onDelete} href="javascript:void(0)">Delete</a>
            <a class="btn-edit" href="/edit/${item._id}">Edit</a>`
        : nothing}    

        ${user && user?._id !== item._ownerId && userLikes == 0
        ? html`<a class="btn-like" href="javascript:void(0)" @click=${onLike} >Like</a>`
        : null}        
        </div>
        <p class="likes">Likes: ${countLikes}</p>
    </div>
</div>
</section>`;

export async function showDetails(ctx) {
    let theater = await getById(ctx.params.id);
    let likes = await getLikes(theater._id);
    let userLikes;
    if (ctx.user) {
        userLikes = await getUserLikes(theater._id, ctx.user._id)
    }

    console.log(userLikes);

    const onLike = async(e) => {
        e.preventDefault();
        await addLike({theaterId: theater._id});
        console.log(userLikes);
        ctx.page.redirect(`/details/${theater._id}`);
        //ctx.display(detailsTemplate(theater, ctx.user, onLike, userLikes, likes));
    }

    ctx.render(detailsTemplate(theater, ctx.user, onLike, onDelete, userLikes, likes));

    async function onDelete() {
        const choice = confirm("Are you sure?");
        if (choice) {
            await deleteByIde(id);
            ctx.page.redirect('/profilePage');
        }
    }
}