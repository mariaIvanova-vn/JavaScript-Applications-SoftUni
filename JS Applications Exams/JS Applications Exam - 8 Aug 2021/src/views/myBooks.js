import { getMyBooks } from "../api/data.js";
import { html } from "../exportsFrom.js";

const myBooksTemplate = (items) => html`
<section id="my-books-page" class="my-books">
<h1>My Books</h1>
<ul class="my-books-list">
        ${items.length > 0
        ? items.map(b => singleTemplate(b))
        : html`<p class="no-books">No books in database!</p>`}
        
    </ul>
</section>
`;

const singleTemplate = (item) => html`
<li class="otherBooks">
        <h3>${item.title}</h3>
        <p>Type:${item.type}</p>
        <p class="img"><img src="${item.imgUrl}"></p>
        <a class="button" href="/details/${item._id}">Details</a>
    </li>
`;

export async function showMyBooks(ctx) {
    const id = ctx.user._id;
    const items = await getMyBooks(id);
    ctx.render(myBooksTemplate(items));
}

