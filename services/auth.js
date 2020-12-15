export function register(email, password, repeatPassword) {
    firebase.auth().createUserWithEmailAndPassword(email, password);
}