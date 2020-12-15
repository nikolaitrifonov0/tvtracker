import {html, render} from 'https://unpkg.com/lit-html?module';

const template = () => html`
    <home-component></home-component>
    <div class="register">
        <form action="/register" method="post" @submit= ${onSubmit}>
            <label for="email">Email:</label>
            <input type="text" name="email">
            <label for="password">Password:</label>
            <input type="text" name="password">
            <label for="repeatPassword">Repeat password:</label>
            <input type="text" name="repeatPassword">
            <button type="submit">Register</button>
        </form>
    </div>
`;

class Register extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        render(template(), this)
    }
}

function onSubmit(e) {
    e.preventDefault();
}

export default Register;