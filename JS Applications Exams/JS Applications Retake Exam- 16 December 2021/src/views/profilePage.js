import { getMyProfile } from "../api/data.js";
import { html } from "../exportsFrom.js";

const myTemplate = (items, user) => html`
<section id="profilePage">
<div class="userInfo">
    <div class="avatar">
        <img src="./images/profilePic.png">
    </div>
    <h2>${user.email}</h2>
</div>
<div class="board">

${items.length > 0
        ? items.map(b => singleTemplate(b))
        : html`<div class="no-events">
                <p>This user has no events yet!</p>
                </div>`}
     
</div>
</section>`;

const singleTemplate = (item) => html`
<div class="eventBoard">
<div class="event-info">
            <img src="${item.imageUrl}">
            <h2>${item.title}</h2>
            <h6>${item.date}</h6>
            <a href="/details/${item._id}" class="details-button">Details</a>
            </div>
        </div>`;


export async function showMyPrifile(ctx) {
    const id = ctx.user._id;
    const items = await getMyProfile(id);
    ctx.render(myTemplate(items, ctx.user));
}