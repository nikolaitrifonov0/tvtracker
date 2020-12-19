import {Router} from 'https://unpkg.com/@vaadin/router';
import errorHandler from '../utilities/errorHandler.js';

export function register(email, password, repeatPassword) {
    if (password.length < 6) {
        throw new Error('Password should be longer than 6 symbols');
    } else if (password != repeatPassword) {
        throw new Error('Passwords don\'t match');
    }
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
        sessionStorage.setItem('auth', JSON.stringify(res));
    })
    .catch(e => errorHandler(e));
}

export function login(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res=> {
        sessionStorage.setItem('auth', JSON.stringify(res));
        Router.go('/');
    })
    .catch(e => errorHandler(e));
}

export function logout() {
    sessionStorage.removeItem('auth');
}

export function getUserData() {   
   
    let data = JSON.parse(sessionStorage.getItem('auth'));
    if (data) {
        return {
            isAuthenticated: true,
            email: data.user.email
        };
    } else {
        return {isAuthenticated: false}
    }
    
   
}