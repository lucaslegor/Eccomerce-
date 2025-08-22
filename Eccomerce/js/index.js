
let productos = [];

fetch('./js/productos.json')
    .then(response => response.json())
    .then(data => {
        productos = data
        cargarProductos(productos)
    })


const contenedorProductos = document.querySelector('#contenedor-productos')
const botonesCategorias =  document.querySelectorAll(".boton-categoria")
const tituloPrincipal = document.querySelector("#titulo-principal")
let botonesAgregar = document.querySelectorAll(".producto-agregar")
const NuevoNumerito = document.querySelector('.numerito')
const aside = document.querySelector("aside")


function cargarProductos(productosElegidos){

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach((p) => {
        const div = document.createElement("div")
        div.classList.add("producto")
        div.innerHTML = `
            <img class="producto-imagen" src="${p.imagen}" alt="${p.titulo}" />
            <div class="producto-detalle">
              <h3 class="producto-titulo">${p.titulo}</h3>
              <p class="producto-precio">$${p.precio}</p>
              <button id="${p.id}" class="producto-agregar">Agregar</button>
            </div>
        `
         contenedorProductos.append(div)
    })

    actualizarBotonesAgregar()
}


botonesCategorias.forEach((b) => {
    b.addEventListener("click", (e) => {
        botonesCategorias.forEach((b) => b.classList.remove("active"))
        e.currentTarget.classList.add("active")
        const categoriaId = e.currentTarget.id;
        if (categoriaId === 'todos') {
            tituloPrincipal.innerHTML = 'Todos los Productos'
            cargarProductos(productos)
        } else {
            const productoCategoria = productos.find((p) => p.categoria.id === e.currentTarget.id)
            tituloPrincipal.innerHTML = productoCategoria.categoria.nombre
            const filtrados = productos.filter((p) => p.categoria.id === e.currentTarget.id )
            cargarProductos(filtrados)

        }
        
    })
})


function actualizarBotonesAgregar() {
  const botones = document.querySelectorAll('.producto-agregar');
  botones.forEach((btn) => {
    btn.addEventListener('click', agregarAlCarrito);
  });
}


let productosCarrito;

const productosEnCarritoLS = JSON.parse(
  localStorage.getItem("productos-en-carrito")
);

if (productosEnCarritoLS) {
    productosCarrito = productosEnCarritoLS
    actualizarNumero()
} else {
    productosCarrito = []
}



function agregarAlCarrito(e){
    Toastify({
    text: "Producto Agregado al Carrito",
    duration: 1500,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
        background: "linear-gradient(to right, #0c2e85, #3965d5)",
        gap: "2px",
        borderRadius: "1em"
    },
    offset: {
    x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
    y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
  },
    onClick: function(){} // Callback after click
    }).showToast();

    const idBoton = e.currentTarget.id
    const productosAgregados = productos.find((p) => p.id === idBoton)

    if (productosCarrito.some((p) => p.id === idBoton)) {
        const i = productosCarrito.findIndex((p) => p.id === idBoton)
        productosCarrito[i].cantidad++
    } else {
        productosAgregados.cantidad = 1
        productosCarrito.push(productosAgregados)
    }
    
    actualizarNumero()
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosCarrito))
}

function actualizarNumero() {
    let unidades = productosCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)
    NuevoNumerito.innerHTML = unidades
}




