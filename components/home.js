import {html, render, nothing} from 'https://unpkg.com/lit-html?module';
import {getUserData} from '../services/auth.js';
import {getCurrentUserShows} from '../services/database.js';
import {getCurrentUserShowsData} from '../services/showsAPI.js';

const template = (ctx) => html`
    <header-component></header-component>
    ${ctx.user.isAuthenticated
    ? html`<div class="series-container">        
        ${ctx.shows?.map(show => html`<card-component .data=${show}></card-component>`)}                     
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
            this.shows = shows; 
        }   
       this.render();
    }

    render() {    
        render(template(this), this, {eventContext: this});               
    }
}

export default Home;