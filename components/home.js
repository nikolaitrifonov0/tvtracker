import {html, render} from 'https://unpkg.com/lit-html?module';

const template = () => html`
    <header-component></header-component>
    <div class="series-container">
        <div class="series">
            <img src="https://images-na.ssl-images-amazon.com/images/I/514969URVvL._SY445_.jpg" alt="">
            <div class="series-data">0/24 <button>+1</button></div>
        </div>              
    </div>
`;

class Home extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        render(template(), this)
    }
}

export default Home;