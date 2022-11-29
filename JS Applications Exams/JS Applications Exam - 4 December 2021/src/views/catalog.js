
import { getAll } from "../api/data.js";
import { html, nothing } from "../exportsFrom.js";

const catalogTemplate = (items, isUser) => html`
<section id="catalogPage">
<h1>All Albums</h1>
${items.length == 0 ? html`
<p>No Albums in Catalog!</p>`
        : items.map(x=>singleTemplate(x, isUser))}

</section>
`;

const singleTemplate = (item, isUser) => html`
<div class="card-box">
    <img src="${item.imgUrl}">
    <div>
        <div class="text-center">
            <p class="name">Name: ${item.name}</p>
            <p class="artist">Artist: ${item.artist}</p>
            <p class="genre">Genre: ${item.genre}</p>
            <p class="price">Price: $${item.price}</p>
            <p class="date">Release Date: ${item.releaseDate}</p>
        </div>
        ${isUser ? html`
        <div class="btn-group">
            <a href="/details/${item._id}" id="details">Details</a>
        </div>
        `
        : nothing}
        
    </div>
</div>
`;

export async function showCatalog(ctx) {
    const items = await getAll();
    ctx.render(catalogTemplate(items, ctx.user));
}

