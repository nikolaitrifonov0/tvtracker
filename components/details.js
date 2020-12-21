import {html, render} from 'https://unpkg.com/lit-html?module';

const template = () => html`
    <header-component/>
`;

class Details extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        render(template(), this);
    }
}

export default Details;
