import { getSearchAlbum } from "../api/data.js";
import { html, nothing } from "../exportsFrom.js";
import { createSubmitHandler } from "../utils.js";

const searchTemplate = (isClicked, onSearch, album, isUser) => html`
<section id="searchPage">
<h1>Search by Name</h1>

<div class="search">
    <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
    <button @click=${onSearch} class="button-list">Search</button>
</div>

<h2>Results:</h2>
${isClicked ?
        album.length > 0 ?
            html`
    <div class="search-result"></div>
    ${album.map(x => createCard(x, isUser))}
    </div>
    ` : html`<p class="no-result">No result.</p>`
        : nothing
    }  
</div>
</section>`;

const createCard = (album, isUser) => html`
<div class="card-box">
        <img src="${album.imgUrl}">
        <div>
            <div class="text-center">
                <p class="name">Name: ${album.name}</p>
                <p class="artist">Artist: ${album.artist}</p>
                <p class="genre">Genre: ${album.genre}</p>
                <p class="price">Price: $${album.price}</p>
                <p class="date">Release Date: ${album.releaseDate}</p>
            </div>
            ${isUser ? html `<div class="btn-group">
            <a href="/details/${album._id}" id="details">Details</a>
        </div>`: nothing}
           
`;


export async function showSearch(ctx) {

    ctx.render(searchTemplate(false, onSearch, ctx.user));

    async function onSearch(e) {
        const searchInput = document.getElementById("search-input");
        const query = searchInput.value;
        if (!query) {
            return alert("enter text!");
        }
        const album = await getSearchAlbum(query);
        ctx.render(searchTemplate(true, onSearch, album,ctx.user))
    }
}