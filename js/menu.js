const menuBtn = document.getElementById('menu-btn');
const navContent = document.getElementById('nav-content');

menuBtn.addEventListener('click', () => {
    navContent.classList.toggle('active');
    menuBtn.classList.toggle('active');
});
