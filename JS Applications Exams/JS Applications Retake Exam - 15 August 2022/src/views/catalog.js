import { getAll } from "../api/data.js";
import { html } from "../exportsFrom.js";

const catalogTemplate = (items) => html`
<section id="dashboard">
<h2>Collectibles</h2>
<ul class="card-wrapper">
${items.length == 0 ? html`
<h2>There are no items added yet.</h2>`
        : items.map(x=>singleTemplate(x))}
  
</ul>
</section>
`;

const singleTemplate = (item) => html`
<li class="card">
    <img src="${item.imgUrl}" />
    <p>
      <strong>Brand: </strong><span class="brand">${item.brand}</span>
    </p>
    <p>
      <strong>Model: </strong
      ><span class="model">${item.model}</span>
    </p>
    <p><strong>Value:</strong><span class="value">${item.value}</span>$</p>
    <a class="details-btn" href="/details/${item._id}">Details</a>
  </li>
`;

export async function showCatalog(ctx) {
    const items = await getAll();
    ctx.render(catalogTemplate(items));
}

