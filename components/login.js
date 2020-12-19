import {html, render} from 'https://unpkg.com/lit-html?module';
import {login} from '../services/auth.js';
import errorHandler from '../utilities/errorHandler.js';

const template = () => html`
    <home-component></home-component>
    <div class="login">
        <form action="/login" method="post" @submit=${onSubmit}>
            <label for="email">Email:</label>
            <input type="email" name="email">
            <label for="password">Password:</label>
            <input type="password" name="password">
            <button type="submit">Login</button>
        </form>
    </div>
`;

class Login extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        render(template(), this);
    }
}

function onSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let email = formData.get('email');
    let password = formData.get('password');

    try{
    login(email, password);
    } catch(e) {errorHandler(e);}
}


export default Login;