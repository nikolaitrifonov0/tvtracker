import {html, render} from 'https://unpkg.com/lit-html?module';
import {getTV} from '../services/showsAPI.js';

const template = (ctx) => html`
    <header-component></header-component>
    <div class="details">
        <img src="${ctx.poster}" alt="">
        <h1>${ctx.name}</h1>
        <h2>${ctx.genres}</h2>
        <p>${ctx.overview}</p>
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
