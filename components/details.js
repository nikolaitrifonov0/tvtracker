import {html, render} from 'https://unpkg.com/lit-html?module';
import {getTV} from '../services/showsAPI.js';

const template = () => html`
    <header-component/>
`;

class Details extends HTMLElement {
    connectedCallback() {
        console.log(getTV(this.location.params.id));
        this.render();
    }

    render() {
        render(template(), this);
    }
}

export default Details;
