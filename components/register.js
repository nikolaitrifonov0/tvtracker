import {html, render} from 'https://unpkg.com/lit-html?module';
import {register} from '../services/auth.js';

const template = () => html`
    <home-component></home-component>
    <div class="register">
        <form action="/register" method="post" @submit= ${onSubmit}>
            <label for="email">Email:</label>
            <input type="email" name="email">
            <label for="password">Password:</label>
            <input type="password" name="password">
            <label for="repeatPassword">Repeat password:</label>
            <input type="password" name="repeatPassword">
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
    let formData = new FormData(e.target);
    let email = formData.get('email');
    let password = formData.get('password');
    let repeatPassword = formData.get('repeatPassword');

    register(email, password, repeatPassword)
    .catch(e => console.log(e));
}

export default Register;