import {Router} from 'https://unpkg.com/@vaadin/router';
import Home from './components/home.js';
import Login from './components/login.js';
import Register from './components/register.js'

customElements.define('home-component', Home);
customElements.define('login-component', Login);
customElements.define('register-component', Register);

const outlet = document.querySelector('.main');
const router = new Router(outlet);

router.setRoutes([
    {path: '/', component: 'home-component'},
    {path: '/login', component: 'login-component'},
    {path: '/register', component: 'register-component'},
]);
