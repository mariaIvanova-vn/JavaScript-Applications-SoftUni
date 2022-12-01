import { editGame, getById } from "../api/data.js";
import { html } from "../exportsFrom.js";
import { createSubmitHandler } from "../utils.js";

const editTemplate = (item, onEdit) => html`
<section id="edit-page" class="auth">
            <form @submit=${onEdit} id="edit">
                <div class="container">

                    <h1>Edit Game</h1>
                    <label for="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" value="${item.title}">

                    <label for="category">Category:</label>
                    <input type="text" id="category" name="category" value="${item.category}">

                    <label for="levels">MaxLevel:</label>
                    <input type="number" id="maxLevel" name="maxLevel" min="1" value="${item.maxLevel}">

                    <label for="game-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" value="${item.imageUrl}">

                    <label for="summary">Summary:</label>
                    <textarea name="summary" id="summary">${item.summary}</textarea>
                    <input class="btn submit" type="submit" value="Edit Game">

                </div>
            </form>
        </section>
`;

export async function showEdit(ctx) {
    const id = ctx.params.id;
    const game = await getById(id);

    ctx.render(editTemplate(game, createSubmitHandler(onEdit)));

    async function onEdit({ title, category, maxLevel, imageUrl,summary }) {
        if (title == '' || category == '' || maxLevel == '' || imageUrl == '' || summary == '') {
            return alert("All fealds are need!")
        }
        await editGame(id, {
            title,
            category,
            maxLevel,
            imageUrl,
            summary
        });

        ctx.page.redirect('/details/' + id);
    }
}