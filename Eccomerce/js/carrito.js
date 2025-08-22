let productosCarrito = JSON.parse(localStorage.getItem('productos-en-carrito')) || [];

const ContenedorcarritoVacio     = document.querySelector('#carrito-vacio');
const ContenedorcarritoProductos = document.querySelector('#carrito-productos');
const ContenedorcarritoAcciones  = document.querySelector('#carrito-acciones');
const ContenedorcarritoComprado  = document.querySelector('#carrito-comprado');
const botonVaciar                = document.querySelector('.carrito-acciones-vaciar');
const totalEl                    = document.querySelector('#total'); 
const comprar = document.querySelector('.carrito-acciones-comprar')

function cargarProductos() {
  if (!productosCarrito.length) {
    ContenedorcarritoVacio.classList.remove('disabled');
    ContenedorcarritoProductos.classList.add('disabled');
    ContenedorcarritoAcciones.classList.add('disabled');
    ContenedorcarritoComprado.classList.add('disabled');
    ContenedorcarritoProductos.innerHTML = '';
    if (totalEl) totalEl.textContent = '$0';
    return;
  }

  ContenedorcarritoVacio.classList.add('disabled');
  ContenedorcarritoProductos.classList.remove('disabled');
  ContenedorcarritoAcciones.classList.remove('disabled');
  ContenedorcarritoComprado.classList.add('disabled');

  ContenedorcarritoProductos.innerHTML = '';
  productosCarrito.forEach((p) => {
    const div = document.createElement('div');
    div.classList.add('carrito-producto');
    div.innerHTML = `
      <img class="carrito-producto-imagen" src="${p.imagen}" alt="${p.titulo}" />
      <div class="carrito-producto-titulo"><small>Título</small><h3>${p.titulo}</h3></div>
      <div class="carrito-producto-cantidad"><small>Cantidad</small><p>${p.cantidad}</p></div>
      <div class="carrito-producto-precio"><small>Precio</small><p>$${p.precio}</p></div>
      <div class="carrito-producto-subtotal"><small>Subtotal</small><p>$${p.precio * p.cantidad}</p></div>
      <button id="${p.id}" class="carrito-producto-eliminar"><i class="bi bi-trash3"></i></button>
    `;
    ContenedorcarritoProductos.append(div);
  });

  actualizarBotonesEliminar();
  actualizarTotal(); // ← actualizar total después de renderizar
}

function actualizarBotonesEliminar() {
  ContenedorcarritoProductos.querySelectorAll('.carrito-producto-eliminar').forEach((btn) => {
    btn.addEventListener('click', eliminarDelCarrito);
  });
}

function eliminarDelCarrito(e) {
  Toastify({
    text: "Producto Eliminado",
    duration: 1500,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
        background: "linear-gradient(to right, #4b33a8, #785ce9)",
        gap: "2px",
        borderRadius: "1em"
    },
    offset: {
    x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
    y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
  },
    onClick: function(){} // Callback after click
    }).showToast();
  const id = e.currentTarget.id;
  const index = productosCarrito.findIndex((p) => p.id === id);
  if (index === -1) return;

  productosCarrito.splice(index, 1);
  localStorage.setItem('productos-en-carrito', JSON.stringify(productosCarrito));
  cargarProductos();
  actualizarTotal(); 
}

botonVaciar.addEventListener('click', vaciarCarrito);

function vaciarCarrito() {
  Swal.fire({
  title: "<strong>Estas Seguro</strong>",
  icon: "question",
  html: `
    Se eliminaran <b>todos</b> tus productos
    del carrito
  `,
  showCancelButton: true,
  focusConfirm: false,
  confirmButtonText: `
    <i class="fa fa-thumbs-up"></i> Si
  `,
  cancelButtonText: `
    <i class="fa fa-thumbs-down"></i> No
  `,
}).then((result) => {
  if (result.isConfirmed) {
    productosCarrito = [];
    localStorage.setItem('productos-en-carrito', JSON.stringify(productosCarrito));
    cargarProductos();
    actualizarTotal(); // ← y acá
  } 
});
  
}

function actualizarTotal() {
  const totalCalculado = productosCarrito.reduce(
    (acc, p) => acc + Number(p.precio) * Number(p.cantidad),
    0
  );
  if (totalEl) {
    totalEl.textContent = totalCalculado.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    });
  }
}

comprar.addEventListener('click', () => {
    ContenedorcarritoVacio.classList.add('disabled');
    ContenedorcarritoProductos.classList.add('disabled');
    ContenedorcarritoAcciones.classList.add('disabled');
    ContenedorcarritoComprado.classList.remove('disabled');
})

cargarProductos();
