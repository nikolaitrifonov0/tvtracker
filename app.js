import {Router} from 'https://unpkg.com/@vaadin/router';
import Home from './components/home.js';

customElements.define('home-component', Home);

const outlet = document.querySelector('.main');
const router = new Router(outlet);

router.setRoutes([
    {path: '/', component: 'home-component'}
]);