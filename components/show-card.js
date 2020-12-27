import {html, render} from 'https://unpkg.com/lit-html?module';

const template = (ctx) => html`    
    <div class="series">
        <img src="${ctx.data.poster}" alt="">
        <div class="series-data">0/${ctx.data.numberOfEpisodes} <button>+1</button></div>
    </div>                 
`;

class Card extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {        
        render(template(this), this)
    }
}

export default Card;