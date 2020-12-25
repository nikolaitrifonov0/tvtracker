import {html, render} from 'https://unpkg.com/lit-html?module';
import {getTV} from '../services/showsAPI.js';
import {getUserData} from '../services/auth.js';
import {addShowToUser} from '../services/database.js';

const template = (ctx) => html`
    <header-component></header-component>
    <div class="details">
        <img src="${ctx.poster}" alt="">
        <h1>${ctx.name}</h1>
        <h2>${ctx.genres}</h2>
        <p class="overview">${ctx.overview}</p>
        ${getUserData().isAuthenticated
        ? html `<button @click=${addToUser}>Start watching</button>`
        : html `<p>Login to start watching</p>`}
    </div>
`;

let showId;

class Details extends HTMLElement {
    connectedCallback() {
        showId = this.location.params.id;
        getTV(showId)
        .then(tv => {
            Object.assign(this, tv);
            this.render();
        });        
    }

    render() {
        render(template(this), this);
    }
}

function addToUser() {
    let email = getUserData().email;

    addShowToUser(email, showId);
}

export default Details;
