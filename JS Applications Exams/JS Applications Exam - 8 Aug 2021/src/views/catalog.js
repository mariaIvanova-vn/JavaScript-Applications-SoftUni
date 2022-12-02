import { getAll } from "../api/data.js";
import { html } from "../exportsFrom.js";

const catalogTemplate = (items) => html`
<section id="dashboard-page" class="dashboard">
<h1>Dashboard</h1>
<ul class="other-books-list">
${items.length == 0 ? html`
<p class="no-books">No books in database!</p>`
        : items.map(x => singleTemplate(x))}
        </ul>
</section>`;

const singleTemplate = (item) => html`
<li class="otherBooks">
        <h3>${item.title}</h3>
        <p>Type: ${item.type}</p>
        <p class="img"><img src="${item.imageUrl}"></p>
        <a class="button" href="/details/${item._id}">Details</a>
    </li>
`;

export async function showCatalog(ctx) {
    const items = await getAll();
    ctx.render(catalogTemplate(items));
}

