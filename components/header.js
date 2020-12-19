import {html, render} from 'https://unpkg.com/lit-html?module';

const template = () => html`
    <header>
        <ul>
            <li><h1><a>TV tracker</a></h1></li>
            <li><a href="/">Home</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
            <input type="text" class="search">
        </ul>
    </header>
`;

class Header extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        render(template(), this)
    }
}

export default Header;