import {html, render} from 'https://unpkg.com/lit-html?module';

const template = () => html`
    <home-component></home-component>
    <div class="login">
        <form action="/login" method="post">
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
        render(template(), this)
    }
}

export default Login;