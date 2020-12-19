export function register(email, password, repeatPassword) {
    if (password.length < 6) {
        throw new Error('Password should be longer than 6 symbols');
    } else if (password != repeatPassword) {
        throw new Error('Passwords don\'t match');
    }
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
        sessionStorage.setItem('auth', JSON.stringify(res));
    });
}