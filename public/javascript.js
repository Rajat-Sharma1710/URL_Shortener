const body = document.querySelector('body');
const toggler = document.querySelector('.menu-toggle');

toggler.addEventListener('click' , ()=>{
    body.classList.toggle('open');
})