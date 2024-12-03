
// handel show mobile menu
document.getElementById('mobile-menu').onclick = () => {
    document.querySelector('.nav-header').classList.add('show-mobile-menu');
}
document.getElementById('close-menu').onclick = () => {
    document.querySelector('.nav-header').classList.remove('show-mobile-menu');
}