import { getMyPosts } from "../api/data.js";
import { html } from "../exportsFrom.js";

const myPostsTemplate = (items) => html`
<section id="my-posts-page">
<h1 class="title">My Posts</h1>
<div class="my-posts">
${items.length == 0 ? html`
<h1 class="title no-posts-title">You have no posts yet!</h1>`
        : 
        
            items.map(post => singleTemplate(post))
        }  
        </div>
</section>`;

const singleTemplate = (item) => html`
<div class="post">
        <h2 class="post-title">${item.title}</h2>
        <img class="post-image" src="${item.imageUrl}" alt="Material Image">
        <div class="btn-wrapper">
            <a href="/details/${item._id}" class="details-btn btn">Details</a>
        </div>
    </div>
`;

export async function showMyPosts(ctx) {
   // const id = ctx.params.id;
    const items = await getMyPosts(ctx.user._id);
    ctx.render(myPostsTemplate(items));
}