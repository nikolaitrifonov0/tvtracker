import {html, render} from 'https://unpkg.com/lit-html?module';
import {getUserData} from '../services/auth.js';
import {search} from '../services/showsAPI.js';

const template = () => html`
    <header>
        <ul>
            <li><h1><a>TV tracker</a></h1></li>
            <li><a href="/">Home</a></li>
            ${getUserData().isAuthenticated
            ? html`<li><a href="/logout">Logout</a></li>>`
            : html`<li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>`}
            <div class="searchDiv">
                <input type="text" class="search" @input=${loadResults}>
                <ul class="results"></ul>
            </div>
        </ul>
    </header>
`
async function loadResults(e) {
    let input = e.target.value;
    const ul = document.querySelector('.results');

    if (input.length >= 3) {        
        ul.innerHTML = '';
        let result = await search(input);
        result.splice(5, result.length - 5);
        result.forEach(r => {
            let li = document.createElement('li');       
            let a = document.createElement('a');
            a.textContent = r.name;
            
            li.appendChild(a);

            ul.appendChild(li);

            if (ul.children.length >= 5) {
                return;
            }
        });
    } else if (input == '') {
        ul.innerHTML = '';
    }
};

class Header extends HTMLElement {
    connectedCallback() {        
        this.render();
    }

    render() {        
        render(template(), this)
    }
}

export default Header;