import {html, render} from 'https://unpkg.com/lit-html?module';
import {getTV} from '../services/showsAPI.js';
import {getUserData} from '../services/auth.js';

const template = (ctx) => html`
    <header-component></header-component>
    <div class="details">
        <img src="${ctx.poster}" alt="">
        <h1>${ctx.name}</h1>
        <h2>${ctx.genres}</h2>
        <p class="overview">${ctx.overview}</p>
        ${getUserData().isAuthenticated
        ? html `<button>Start watching</button>`
        : html `<p>Login to start watching</p>`}
    </div>
`;

class Details extends HTMLElement {
    connectedCallback() {
        getTV(this.location.params.id)
        .then(tv => {
            Object.assign(this, tv);
            this.render();
        });        
    }

    render() {
        render(template(this), this);
    }
}

export default Details;
