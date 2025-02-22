const ico = document.querySelector('.burger');
const fullMenu = document.querySelector('.full-menu');
const none = document.querySelector('.none');

ico.addEventListener('click', function() {
  this.classList.toggle('is-active');
  fullMenu.classList.toggle('is-active');
  none.classList.toggle('html-overflow');
});