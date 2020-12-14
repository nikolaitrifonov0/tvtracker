import {html, render} from 'https://unpkg.com/lit-html?module';

const template = () => html`
    <div class="series-container">
        <div class="series">
            <img src="https://images-na.ssl-images-amazon.com/images/I/514969URVvL._SY445_.jpg" alt="">
            <div class="series-data">0/24 <button>+1</button></div>
        </div>
        <div class="series">
            <img src="data:image/jpeg;base64,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" alt="">
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