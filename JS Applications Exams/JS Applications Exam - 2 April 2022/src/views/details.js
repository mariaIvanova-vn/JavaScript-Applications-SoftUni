import { deleteByIde, getById } from "../api/data.js";
import { donate, getDonations, getOwnDonation } from "../api/donations.js";
import { html } from "../lib.js";

const detailsTemplate = (pet,donations,  isUser, canDonate, isOwner, onDelete, onLike) => html`
<section id="detailsPage">
<div class="details">
    <div class="animalPic">
        <img src="${pet.image}">
    </div>
    <div>
        <div class="animalInfo">
            <h1>Name: ${pet.name}</h1>
            <h3>Breed: ${pet.breed}</h3>
            <h4>Age: ${pet.age}</h4>
            <h4>Weight: ${pet.weight}</h4>
            <h4 class="donation">Donation: ${donations}$</h4>
        </div>
        ${petControls(pet, isUser,canDonate, isOwner, onDelete, onLike)}
    </div>
</div>
</section>`;

function petControls(pet, isUser, canDonate, isOwner, onDelete, onLike){
    if(isUser==false){
        return nothing;
    }
    if(canDonate){
        return html`<div class="actionBtn">
        <a @click=${onLike} href="javascript:void(0)" class="donate">Donate</a>          
        </div>`;
    }
    if(isOwner){
        return html`<div class="actionBtn">       
        <a href="/edit/${pet._id}" class="edit">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>         
        </div>`;
    }
}


export async function showDetails(ctx) {
    const id = ctx.params.id;

    const request=[
        getById(id),
        getDonations(id)
    ];
    const isUser = Boolean(ctx.user);
    if(isUser){
        request.push(getOwnDonation(id,ctx.user._id));
    }
    const [pet, donations, hasDonation] = await Promise.all(request);
    
    const isOwner = isUser && ctx.user._id == pet._ownerId;
    const canDonate= !isOwner &&  hasDonation==0;

    ctx.render(detailsTemplate(pet,donations*100, isUser, canDonate, isOwner, onDelete, onLike));

    async function onDelete(){
        const choice = confirm("Are you sure?");
        if(choice){
            await deleteByIde(id);
            ctx.page.redirect('/');
        }
    }
    async function onLike(){
        await donate(id);
        ctx.page.redirect('/catalog/' + id);
    }
}