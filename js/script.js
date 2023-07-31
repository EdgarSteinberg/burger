
let productCards = document.getElementById("product-cards")
let carrito = []



for (let i = 0; i < productos.length; i++) {
    let producto = productos[i]

    let cardHTML = `
    <div class="card" style="width: 18rem;">
        <img src="${producto.imagen}" class="card-img-top" alt="...">
         <div class="card-body">
            <h5 class="card-title">${producto.descripcion}</h5>
          <p class="card-text">${producto.precio.toFixed(2)}</p>
          <input type="number" class="form-control mb-2" placeholder="Cantidad" value="0" data-producto-id="${producto.id}"> 
          <button class="btn btn-agregar-carrito" data-producto-id="${producto.id}">AGREGAR AL CARRITO</button>
        </div>
    </div>
    `;

    productCards.innerHTML += cardHTML
}

let cantidadInputs = document.querySelectorAll('input[type="number"]')

for (let i = 0; i < cantidadInputs.length; i++) {
    let input = cantidadInputs[i]
    input.addEventListener("input", actualizarCantidad)
}

let agregarButtons = document.getElementsByClassName("btn-agregar-carrito")

for (let i = 0; i < agregarButtons.length; i++) {
    let button = agregarButtons[i]
    button.addEventListener("click", agregarAlCarrito)
}

function actualizarCantidad(event) {
    let input = event.target
    let productoId = input.getAttribute("data-producto-id")
    let cantidad = parseInt(input.value)

    let producto = productos.find((producto) => producto.id == parseInt(productoId))
    producto.cantidad = cantidad
}

function agregarAlCarrito(event) {
    let button = event.target
    let productoId = button.getAttribute("data-producto-id")

    let producto = productos.find((producto) => producto.id == parseInt(productoId))

    let productoEnCarrito = carrito.find((item) => item.id == producto.id)

    if (productoEnCarrito) {
        productoEnCarrito += producto.cantidad
    } else {
        carrito.push({ ...producto })
    }

    console.log("producto agregado al carrito. ID: " + productoId)
    console.log("carrito", carrito)
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


