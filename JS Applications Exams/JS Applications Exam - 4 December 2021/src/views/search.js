import { getSearchAlbum } from "../api/data.js";
import { html } from "../exportsFrom.js";
import { createSubmitHandler } from "../utils.js";

const searchTemplate =(album)=>html`
<section id="searchPage">
<h1>Search by Name</h1>

<div class="search">
    <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
    <button class="button-list">Search</button>
</div>

<h2>Results:</h2>

<!--Show after click Search button-->
<div class="search-result">
    <!--If have matches-->
    <div class="card-box">
        <img src="./images/BrandiCarlile.png">
        <div>
            <div class="text-center">
                <p class="name">Name: In These Silent Days</p>
                <p class="artist">Artist: Brandi Carlile</p>
                <p class="genre">Genre: Low Country Sound Music</p>
                <p class="price">Price: $12.80</p>
                <p class="date">Release Date: October 1, 2021</p>
            </div>
            <div class="btn-group">
                <a href="/details/${album._id}" id="details">Details</a>
            </div>
        </div>
    </div>

    <!--If there are no matches-->
    <p class="no-result">No result.</p>
</div>
</section>
`;

export async function showSearch(ctx){
    const id = ctx.params.id;
    const album = await getSearchAlbum(id);
    ctx.render(searchTemplate(album));
}