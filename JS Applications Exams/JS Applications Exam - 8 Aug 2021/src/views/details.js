import { deleteByIde, getById } from "../api/data.js";
import { html, page, nothing } from "../exportsFrom.js";

const detailsTemplate = (item, user, onDelete) => html`
<section id="details-page" class="details">
<div class="book-information">
    <h3>${item.title}</h3>
    <p class="type">Type: ${item.type}</p>
    <p class="img"><img src="${item.imageUrl}"></p>
    <div class="actions">
        <!-- Edit/Delete buttons ( Only for creator of this book )  -->

        ${user?._id == item._ownerId ? html`
        <a class="button" href="/edit/${item._id}">Edit</a>
        <a class="button" @click=${onDelete} href="javascript:void(0)">Delete</a>`
: nothing}

        

        <!-- Bonus -->
        <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
        <a class="button" href="#">Like</a>

        <!-- ( for Guests and Users )  -->
        <div class="likes">
            <img class="hearts" src="/images/heart.png">
            <span id="total-likes">Likes: 0</span>
        </div>
        <!-- Bonus -->


    </div>
</div>
<div class="book-description">
    <h3>Description:</h3>
    <p>${item.description}</p>
</div>
</section>
`;


export async function showDetails(ctx) {
    const id = ctx.params.id;
    const item = await getById(id);
    //const isCreator = ctx.user._id == item._ownerId;
    ctx.render(detailsTemplate(item, ctx.user, onDelete));

    async function onDelete(){
        const choice = confirm("Are you sure?");
        if(choice){
            await deleteByIde(id);
            ctx.page.redirect('/catalog');
        }
    }
}