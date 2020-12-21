import {Router} from 'https://unpkg.com/@vaadin/router';
import {logout} from './services/auth.js'
import Home from './components/home.js';
import Login from './components/login.js';
import Register from './components/register.js';
import Header from './components/header.js';
import Details from './components/details.js';

customElements.define('home-component', Home);
customElements.define('login-component', Login);
customElements.define('register-component', Register);
customElements.define('header-component', Header);
customElements.define('details-component', Details);

const outlet = document.querySelector('.main');
const router = new Router(outlet);

router.setRoutes([
    {path: '/', component: 'home-component'},
    {path: '/login', component: 'login-component'},
    {path: '/register', component: 'register-component'},
    {path: '/logout', 
    action: (context, commands) => {        
        logout();
        location = '/';
        return commands.component('home-component');
    }},
    {path: '/:id', component: 'details-component'},
]);
