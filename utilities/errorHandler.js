export default function handleError(e) {
    const notif = document.querySelector('.error-notification');
    notif.textContent = e.message;
    notif.style.display = 'block';
    setTimeout(() => {notif.style.display = 'none';}, 3000);
}