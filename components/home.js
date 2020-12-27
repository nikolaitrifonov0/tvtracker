import {html, render} from 'https://unpkg.com/lit-html?module';
import {getUserData} from '../services/auth.js';
import {getCurrentUserShowsData} from '../services/showsAPI.js';

const template = (ctx) => html`
    <header-component></header-component>
    <div class="series-container">
        <div class="series">
        ${ctx.shows?.map(show => html`<card-component .data=${show}></card-component>`)}
        </div>              
    </div>
`;

class Home extends HTMLElement {
    async connectedCallback() {
        let shows = await getCurrentUserShowsData()        
        this.shows = shows;    
       this.render();
    }

    render() {    
        render(template(this), this, {eventContext: this});               
    }
}

export default Home;