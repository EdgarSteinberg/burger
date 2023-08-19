//Proyecto final Nombre Edgar Apellido Steinberg

// Arreglo para almacenar los datos de los productos en el catálogo.
let productos;
// Arreglo para almacenar los productos en el carrito de compras.
// Si no hay datos en el LocalStorage, se inicializa como un arreglo vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const productCards = document.getElementById("product-cards");// Tarjetas de productos
const cantidadInputs = document.querySelectorAll('input[type="number"]');// Campos de cantidad
const agregarButtons = document.getElementsByClassName("btn-agregar-carrito"); // Botones agregar al carrito
const modalBody = document.getElementById("modal-body")// Cuerpo del modal
const botonCarrito = document.getElementById("botonCarrito")// Botón carrito

let buscador = document.getElementById("buscador")//Campo de busqueda
let btnVerCatalogo = document.getElementById("VerCatalogo")// Botón ver catálogo
let btnOcultarCatalogo = document.getElementById("ocultarCatalogo")// Botón ocultar catálogo
let coincidencia = document.getElementById("coincidencia")// Mensajes de coincidencia
let selectOrden = document.getElementById("selectOrden")// Selector de orden


// Esta función muestra las tarjetas de productos en el catálogo.
// Recibe un arreglo de datos de productos (productosData) y los muestra en tarjetas.
function mostrarCatalogo(productosData) {
    // Limpia el contenido de las tarjetas de productos existentes.
    productCards.innerHTML = "";
    // Asigna los datos de productos proporcionados a la variable global 'productos'.
    productos = productosData;
    for (let i = 0; i < productos.length; i++) {
        let producto = productos[i];
        // Crea una cadena de HTML para la tarjeta del producto.
        let cardHTML = `
                <div class="card" style="width: 18rem;">
                    <img src="${producto.imagen}" class="card-img-top" alt="hamburguesas">
                    <div class="card-body">
                        <h5 class="card-title">${producto.descripcion}</h5>
                        <p class="card-text">Precio: $${producto.precio.toFixed(2)}</p>
                        <input type="number" class="form-control mb-2" placeholder="Cantidad" value="0" data-producto-id="${producto.id}"> 
                        <button class="btn btn-agregar-carrito" data-producto-id="${producto.id}">AGREGAR AL CARRITO</button>
                    </div>
                </div>
            `;
        // Agrega la cadena HTML al contenedor de tarjetas de productos.
        productCards.innerHTML += cardHTML;
    }
    // Recorremos todos los inputs
    for (let i = 0; i < cantidadInputs.length; i++) {
        let input = cantidadInputs[i];
        input.addEventListener("input", (event) => actualizarCantidad(event, productosData));
    }
    // Recorremos todos los botones
    for (let i = 0; i < agregarButtons.length; i++) {
        let button = agregarButtons[i];
        button.addEventListener("click", (event) => agregarAlCarrito(event, productosData));
    }
}


// Esta función realiza una solicitud HTTP utilizando fetch para obtener los datos del catálogo de productos.
// Retorna una promesa que resuelve en los datos del catálogo en formato JSON.
function getCatalogo() {
    // Realiza una solicitud GET al archivo "productos.json" y espera la respuesta.
    // La respuesta se convierte en formato JSON y se devuelve como resultado.
    return fetch("./productos.json").then(response => response.json())
}

// Esta función se utiliza para capturar el ID del producto y actualizar la cantidad en función de lo que se escribe en el input.
function actualizarCantidad(event) {
    // Obtiene el elemento input que disparó el evento.
    let input = event.target
    // Captura el ID del producto desde el atributo 'data-producto-id' del input.
    let productoId = input.getAttribute("data-producto-id")
    // Convierte el valor del input a un número entero (cantidad).
    let cantidad = parseInt(input.value)
    // Busca el producto correspondiente en la lista de productos usando el ID capturado.
    let producto = productos.find((producto) => producto.id == parseInt(productoId))
    // Actualiza la cantidad en el objeto del producto.
    producto.cantidad = cantidad

}

// Esta función se utiliza para agregar productos al carrito de compras.
function agregarAlCarrito(event, productos) {
    // Obtiene el botón que disparó el evento.
    let button = event.target;
    // Captura el ID del producto desde el atributo 'data-producto-id' del botón.
    let productoId = button.getAttribute("data-producto-id");
    // Busca el producto correspondiente en la lista de productos usando el ID capturado.
    let producto = productos.find((producto) => producto.id == parseInt(productoId));
    // Obtiene el input de cantidad correspondiente al producto.
    let input = document.querySelector(`input[data-producto-id="${productoId}"]`);
    // Convierte el valor del input a un número entero (cantidad).
    let cantidad = parseInt(input.value);
    // Verifica si el producto ya está en el carrito.
    let productoEnCarrito = carrito.find((item) => item.id == producto.id);

    // Si el producto ya está en el carrito, incrementa la cantidad.
    // Si el producto no está en el carrito, agrégalo.
    productoEnCarrito ? productoEnCarrito.cantidad += cantidad : carrito.push({ ...producto, cantidad });
    // Almacena el carrito actualizado en el LocalStorage.
    localStorage.setItem("carrito", JSON.stringify(carrito));
    // Muestra una notificación de que el producto se ha agregado al carrito.
    Swal.fire(
        'Has agregado este producto al carrito!',
    );
}



// Esta función se encarga de cargar los productos en el carrito en el modal.
function cargarProductosCarrito(carrito) {
    // Limpia el contenido actual del cuerpo del modal.
    modalBody.innerHTML = "";
    // Recorre los productos en el carrito y muestra una tarjeta para cada uno en el modal.
    carrito.forEach((productoCarrito) => {
        modalBody.innerHTML += `<div class="card border-primary mb-3" id="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
        <img class="card-img-top" height="300px" src="${productoCarrito.imagen}" alt="">
        <div class="card-body">
            <h4 class="card-title">${productoCarrito.descripcion}</h4>
            <h3 class="card-text">$${productoCarrito.precio}</h3>
            <p>Cantidad: ${productoCarrito.cantidad}</p>
            <h3>Total de la compra: $${(productoCarrito.cantidad * productoCarrito.precio).toFixed(2)}</h3>
            <button class="btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
        </div>
    </div>`;
    });
    // Agrega eventos de clic a los botones de eliminar productos.
    carrito.forEach((productoCarrito, indice) => {
        document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click", () => {
            // Elimina la tarjeta del producto del modal y el producto del carrito.
            let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`);
            cardProducto.remove();
            carrito.splice(indice, 1);
            // Actualiza el carrito en el LocalStorage.
            localStorage.setItem("carrito", JSON.stringify(carrito));
        });
    });
}

// Agrega un evento de clic al botón de carrito para mostrar los productos en el modal.
botonCarrito.addEventListener("click", () => {
    cargarProductosCarrito(carrito);
});

// Obtiene los datos del catálogo y muestra los productos en la página.
getCatalogo().then(data => {
    mostrarCatalogo(data);

})

// Esta función realiza una búsqueda de productos basada en un término de búsqueda.
function buscarInfo(buscado, productosData) {
    // Filtra los productos que coinciden con el término de búsqueda en el nombre o descripción.
    let busqueda = productosData.filter(
        (burguer) => burguer.nombreProducto.toLowerCase().includes(buscado.toLowerCase()) || burguer.descripcion.toLowerCase().includes(buscado.toLowerCase())
    )
    // Si no hay coincidencias, muestra un mensaje y vuelve a mostrar todos los productos.
    if (busqueda.length == 0) {
        coincidencia.innerHTML = ""
        let nuevoDiv = document.createElement("div")
        nuevoDiv.textContent = "No hay coincidencias";
        coincidencia.appendChild(nuevoDiv)
        mostrarCatalogo(productosData)
        // Si hay coincidencias, muestra los productos coincidentes.
    } else {
        coincidencia.innerHTML = ""
        mostrarCatalogo(busqueda)
    }

}

// Agrega un evento de escucha al campo de búsqueda.
buscador.addEventListener("input", () => {
    // Ejecuta la función de búsqueda con el valor actual del campo de búsqueda y la lista de productos.
    buscarInfo(buscador.value, productos)
})

// Función para ordenar los productos de mayor a menor precio.
function orndenarMayorMenor(productosData) {
    // Crea una copia del arreglo de productos y lo ordena de mayor a menor precio.
    let mayorMenor = [].concat(productosData)
    mayorMenor.sort((a, b) => (b.precio - a.precio))
    // Muestra el catálogo de productos ordenados.
    mostrarCatalogo(mayorMenor)
}
// Función para ordenar los productos de menor a mayor precio.
function ordenarMenorMayor(productosData) {
    // Crea una copia del arreglo de productos y lo ordena de menor a mayor precio.
    let menorMayor = [].concat(productosData)
    menorMayor.sort((a, b) => (a.precio - b.precio))
    // Muestra el catálogo de productos ordenados.
    mostrarCatalogo(menorMayor)
}
// Función para ordenar los productos alfabéticamente por descripción.
function OrdenarAlfabeticamente(productosData) {
    // Crea una copia del arreglo de productos y lo ordena alfabéticamente por descripción.
    let alfabeticamente = [].concat(productosData)
    alfabeticamente.sort((a, b) => {
        if (a.descripcion > b.descripcion) return 1
        if (a.descripcion < b.descripcion) return -1
        return 0;
    })
    // Muestra el catálogo de productos ordenados alfabéticamente.
    mostrarCatalogo(alfabeticamente)
}
// Agrega un evento de cambio al selector de orden.
selectOrden.addEventListener("change", () => {
    // Verifica el valor seleccionado en el selector y ejecuta la función de orden correspondiente.
    if (selectOrden.value == 1) {
        orndenarMayorMenor(productos)
    } else if (selectOrden.value == 2) {
        ordenarMenorMayor(productos)
    } else if (selectOrden.value == 3) {
        OrdenarAlfabeticamente(productos)
    } else {
        // Si no se selecciona ningún orden específico, muestra el catálogo original de productos
        mostrarCatalogo(productos)
    }
})