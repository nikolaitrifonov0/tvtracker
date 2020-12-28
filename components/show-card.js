import {html, render} from 'https://unpkg.com/lit-html?module';
import {addEpisode} from '../services/database.js';
import {getUserData} from '../services/auth.js';

const template = (ctx) => html`    
    <div class="series">
        <img src="${ctx.data.poster}" alt="">
        <div class="series-data">0/${ctx.data.numberOfEpisodes} <button @click=${ctx.addEpisode}>+1</button></div>
    </div>                 
`;

class Card extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {        
        render(template(this), this)
    }
    addEpisode() {
        let showData = this.parentElement.parentElement.parentElement.data;
        console.log(showData);
        addEpisode(getUserData().email, showData.id, showData.numberOfEpisodes);
    }
}



export default Card;