import { getAll } from "../api/data.js";
import { html } from "../exportsFrom.js";

const catalogTemplate = (items) => html`
<section id="dashboard">
<h2>Job Offers</h2>
${items.length == 0 ? html`
<h2>No offers yet.</h2>`
        : items.map(x=>singleTemplate(x))}
</section>
`;

const singleTemplate = (item) => html`
<div class="offer">
  <img src="${item.imgUrl}" alt="example1" />
  <p>
    <strong>Title: </strong><span class="title">${item.title}</span>
  </p>
  <p><strong>Salary:</strong><span class="salary">${item.salary}</span></p>
  <a class="details-btn" href="/details/${item._id}">Details</a>
</div>
`;

export async function showCatalog(ctx) {
    const items = await getAll();
    ctx.render(catalogTemplate(items));
}

