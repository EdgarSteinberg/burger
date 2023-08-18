
let productos;
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];



const productCards = document.getElementById("product-cards");
const cantidadInputs = document.querySelectorAll('input[type="number"]');
const agregarButtons = document.getElementsByClassName("btn-agregar-carrito");
const modalBody = document.getElementById("modal-body")
const botonCarrito = document.getElementById("botonCarrito")



let buscador = document.getElementById("buscador")
let btnVerCatalogo = document.getElementById("VerCatalogo")
let btnOcultarCatalogo = document.getElementById("ocultarCatalogo")
let coincidencia = document.getElementById("coincidencia")
let selectOrden = document.getElementById("selectOrden")



function mostrarCatalogo(productosData) {
    productCards.innerHTML = ""; // Limpiar el contenido previo
    productos = productosData;
    for (let i = 0; i < productos.length; i++) {
        let producto = productos[i];

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

        productCards.innerHTML += cardHTML;
    }
    for (let i = 0; i < cantidadInputs.length; i++) {
        let input = cantidadInputs[i];
        input.addEventListener("input", (event) => actualizarCantidad(event, productosData));
    }

    for (let i = 0; i < agregarButtons.length; i++) {
        let button = agregarButtons[i];
        button.addEventListener("click", (event) => agregarAlCarrito(event, productosData));
    }
}



function getCatalogo() {
    return fetch("./productos.json").then(response => response.json())
}

function actualizarCantidad(event) {
    let input = event.target
    let productoId = input.getAttribute("data-producto-id")
    let cantidad = parseInt(input.value)

    let producto = productos.find((producto) => producto.id == parseInt(productoId))
    producto.cantidad = cantidad

}

function agregarAlCarrito(event, productos) {
    let button = event.target;
    let productoId = button.getAttribute("data-producto-id");

    let producto = productos.find((producto) => producto.id == parseInt(productoId));

    let input = document.querySelector(`input[data-producto-id="${productoId}"]`);
    let cantidad = parseInt(input.value);

    let productoEnCarrito = carrito.find((item) => item.id == producto.id);


    productoEnCarrito ? productoEnCarrito.cantidad += cantidad : carrito.push({ ...producto, cantidad });

    localStorage.setItem("carrito", JSON.stringify(carrito));

    Swal.fire(
        'Has agregado este producto al carrito!',
    );
}




function cargarProductosCarrito(carrito) {
    modalBody.innerHTML = "";
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

    carrito.forEach((productoCarrito, indice) => {
        document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click", () => {
            let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`);
            cardProducto.remove();
            carrito.splice(indice, 1);
            localStorage.setItem("carrito", JSON.stringify(carrito));
        });
    });
}

botonCarrito.addEventListener("click", () => {
    cargarProductosCarrito(carrito);
});



getCatalogo().then(data => {
    mostrarCatalogo(data);

    /* for (let i = 0; i < cantidadInputs.length; i++) {
        let input = cantidadInputs[i];
        input.addEventListener("input", (event) => actualizarCantidad(event, data));
    }

    for (let i = 0; i < agregarButtons.length; i++) {
        let button = agregarButtons[i];
        button.addEventListener("click", (event) => agregarAlCarrito(event, data));
    } */


})



function buscarInfo(buscado, productosData) {
    let busqueda = productosData.filter(
        (burguer) => burguer.nombreProducto.toLowerCase().includes(buscado.toLowerCase()) || burguer.descripcion.toLowerCase().includes(buscado.toLowerCase())
    )
    if (busqueda.length == 0) {
        coincidencia.innerHTML = ""
        let nuevoDiv = document.createElement("div")
        nuevoDiv.textContent = "No hay coincidencias";
        coincidencia.appendChild(nuevoDiv)
        mostrarCatalogo(productosData)
    } else {
        coincidencia.innerHTML = ""
        mostrarCatalogo(busqueda)
    }

}

buscador.addEventListener("input", () => {
    buscarInfo(buscador.value, productos)
})



function orndenarMayorMenor(productosData) {
    let mayorMenor = [].concat(productosData)
    mayorMenor.sort((a, b) => (b.precio - a.precio))
    mostrarCatalogo(mayorMenor)
}

function ordenarMenorMayor(productosData) {
    let menorMayor = [].concat(productosData)
    menorMayor.sort((a, b) => (a.precio - b.precio))
    mostrarCatalogo(menorMayor)
}

function OrdenarAlfabeticamente(productosData) {
    let alfabeticamente = [].concat(productosData)
    alfabeticamente.sort((a, b) => {
        if (a.descripcion > b.descripcion) return 1
        if (a.descripcion < b.descripcion) return -1
        return 0;
    })
    mostrarCatalogo(alfabeticamente)

}
selectOrden.addEventListener("change", () => {
    if (selectOrden.value == 1) {
        orndenarMayorMenor(productos)
    } else if (selectOrden.value == 2) {
        ordenarMenorMayor(productos)
    } else if (selectOrden.value == 3) {
        OrdenarAlfabeticamente(productos)
    } else {
        mostrarCatalogo(productos)
    }
})