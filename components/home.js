import {html, render, nothing} from 'https://unpkg.com/lit-html?module';
import {getUserData} from '../services/auth.js';
import {getCurrentUserShows, getStatus} from '../services/database.js';
import {getCurrentUserShowsData} from '../services/showsAPI.js';

const template = (ctx) => html`
    <header-component></header-component>
    ${ctx.user.isAuthenticated
    ? html`<div>
        <h1>Watching</h1>
        <div class="series-container">        
        ${ctx.shows?.filter(show => show.status == 'watching').map(show => html`<card-component .data=${show}></card-component>`)}                     
        </div>
    </div>
    <div>
        <h1>Completed</h1>
        <div class="series-container">        
        ${ctx.shows?.filter(show => show.status == 'completed').map(show => html`<card-component .data=${show}></card-component>`)}                     
        </div>
    </div>`
    :nothing}
`;

class Home extends HTMLElement {
    constructor() {
        super();
        this.user = getUserData();
    }

    async connectedCallback() {
        if (this.user.isAuthenticated) {
            let email = this.user.email;
            let ids = await getCurrentUserShows(email);
            let shows = await getCurrentUserShowsData(ids);
            await this.setShowsStatus(shows, email);
                
            this.shows = shows; 
        }   
       this.render();
    }

    async setShowsStatus(shows, email) {
        for (const show of shows) {
            show['status'] = await getStatus(email, show.id);
        }
    }

    render() {   
        render(template(this), this, {eventContext: this});               
    }
}

export default Home;