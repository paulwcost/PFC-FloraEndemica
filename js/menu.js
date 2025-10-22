document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navContent = document.querySelector('#nav-content');

    if (menuToggle && navContent) {
        menuToggle.addEventListener('click', () => {
            navContent.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
});