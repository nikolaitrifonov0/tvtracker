import {Router} from 'https://unpkg.com/@vaadin/router';
import Home from './components/home.js';
import Login from './components/login.js';

customElements.define('home-component', Home);
customElements.define('login-component', Login)

const outlet = document.querySelector('.main');
const router = new Router(outlet);

router.setRoutes([
    {path: '/', component: 'home-component'},
    {path: '/login', component: 'login-component'},
]);