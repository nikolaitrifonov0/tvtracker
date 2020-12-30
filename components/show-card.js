import {html, render} from 'https://unpkg.com/lit-html?module';
import {addEpisode, getCurrentEpisode, getStatus} from '../services/database.js';
import {getUserData} from '../services/auth.js';

const template = (ctx) => html`    
    <div class="series">
        <img src="${ctx.data.poster}" alt="">
        <div class="series-data">${ctx.currentEpisode}/${ctx.data.numberOfEpisodes} <button @click=${ctx.addEpisode}>+1</button></div>
    </div>                 
`;

class Card extends HTMLElement {
    connectedCallback() {        
        this.render();
    }

    async render() {   
        this.currentEpisode = await getCurrentEpisode(getUserData().email, this.data.id);    
        render(template(this), this);
    }
    async addEpisode() {
        let homeComponent = document.getElementsByTagName('home-component')[0];
        let showCard = this.parentElement.parentElement.parentElement;
        let showData = showCard.data;

        await addEpisode(getUserData().email, showData.id, showData.numberOfEpisodes);
        showCard.render();

        showData.status = await getStatus(getUserData().email, showData.id);
        if (showData.status == 'completed') {
            homeComponent.render();
        }
    }
}



export default Card;