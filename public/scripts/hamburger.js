const hamburger = document.querySelector('.hamburger');
const ul = document.querySelector('#nav ul');

hamburger.addEventListener('click', function() {
    this.classList.toggle('is-active');
    ul.classList.toggle('show-menu');
});