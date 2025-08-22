const abrirMenu = document.querySelector('#abrir-menu')
const cerrarMenu = document.querySelector('#cerrar-menu')
const aside = document.querySelector("aside")
const botonesCategorias = document.querySelectorAll('.boton-categoria');


abrirMenu.addEventListener('click', () => {
    aside.classList.add('aside-visible')
} )

cerrarMenu.addEventListener('click', () => {
    aside.classList.remove('aside-visible')
})

botonesCategorias.forEach(b => {
    b.addEventListener('click', () => {
    aside.classList.remove('aside-visible')
})
});
