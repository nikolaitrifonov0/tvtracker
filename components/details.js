import {html, render} from 'https://unpkg.com/lit-html?module';
import {Router} from 'https://unpkg.com/@vaadin/router';
import {getTVDetails} from '../services/showsAPI.js';
import {getUserData} from '../services/auth.js';
import {addShowToUser, isWatching} from '../services/database.js';

const checkIfWatching = async (ctx) => html `${await isWatching(getUserData().email, ctx.id)
    ? html `<p>Already watching</p>`
    : html `<button @click=${addToUser}>Start watching</button>`}`;

const template = async (ctx) => html`
    <header-component></header-component>
    <div class="details">
        <img src="${ctx.poster}" alt="">
        <h1>${ctx.name}</h1>
        <h2>${ctx.genres}</h2>
        <p class="overview">${ctx.overview}</p>
        ${getUserData().isAuthenticated
        ? html `${await checkIfWatching(ctx)}`
        : html `<p>Login to start watching</p>`}
    </div>
`;

let showId;

class Details extends HTMLElement {
    connectedCallback() {
        showId = this.location.params.id;
        getTVDetails(showId)
        .then(tv => {
            Object.assign(this, tv);
            this.render();
        });        
    }

    async render() {
        render(await template(this), this);
    }
}

async function addToUser() {
    let email = getUserData().email;

    await addShowToUser(email, showId);
    Router.go('/');
}

export default Details;
