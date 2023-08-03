//Tercera entrega
// Nombre Edgar Apellido Steinberg


//Capturo el ID
let productCards = document.getElementById("product-cards")
//Creamos un array vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];



//For con variable producto asignamos todo nuestro array
//cardHTML con temple literal agregamos nuestra tarjeta y remplazamos los valores por los d nuestro array
//a productCardsinnerHTML acedemos a nuestro div con el += le colocamos nuestras tarjetas y se agrega cada producto
for (let i = 0; i < productos.length; i++) {
    let producto = productos[i]

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

    productCards.innerHTML += cardHTML
}

//caputamos el input de la tarjeta
let cantidadInputs = document.querySelectorAll('input[type="number"]')

//lo recorremos con un for lo amacenamos en input creamos un evento y le pasamos la funcion actualizarcantidad
for (let i = 0; i < cantidadInputs.length; i++) {
    let input = cantidadInputs[i]
    input.addEventListener("input", actualizarCantidad)
}

//Capturamos nuestros botones de la tajeta con su clase
let agregarButtons = document.getElementsByClassName("btn-agregar-carrito")


//Lo recorremos con el for lo almacenamos e button creamos un evento click y le pasamos la funcion agregaralcarrito
for (let i = 0; i < agregarButtons.length; i++) {
    let button = agregarButtons[i]
    button.addEventListener("click", agregarAlCarrito)
}

//Esta funcion recibe parametro event que se lo agregamos al input capturamos la posicion de donde clickeamos con getatribue le asignamos un id
//se parsea en la variable cantidad para que solo reciba numeros
//productos find comparamos mi array de objetos con mi nuevo atributo 
//producto.cantidad ya no es cero si no lo que coloca el usuario
function actualizarCantidad(event) {
    let input = event.target
    let productoId = input.getAttribute("data-producto-id")
    let cantidad = parseInt(input.value)

    let producto = productos.find((producto) => producto.id == parseInt(productoId))
    producto.cantidad = cantidad
}

//caputaramos con getelementbyid carrito que es almacenado en carritocontenedor que despues le agregamos.innerHTML para vaciarlo
// desestructuración para extraer las propiedades se crea un div con createElement
//cardCarrito.innerHTML se actualiza la informacion del html luego se le agrega una clase para modificarlo en el css
//carritoContenedor.appendChild se agrega el elemento cardCarrito, que contiene la información del producto esto añade visualmente el producto al carrito en la página web.
function actualizarCarrito() {
    let carritoContenedor = document.getElementById("carrito")
    carritoContenedor.innerHTML = ""

    for (let producto of carrito) {
        let { nombreProducto,descripcion,precio,cantidad } = producto
        let cardCarrito = document.createElement("div")
        cardCarrito.innerHTML = `
            <h3>Producto: ${nombreProducto}</h3>
            <h3>${descripcion}</h3>
            <h3>Precio: $${precio.toFixed(2)}</h3>
            <h3>Cantidad: ${cantidad}</h3>
            <h3>Total de la compra: ${nombreProducto}: $${(producto.cantidad * producto.precio).toFixed(2)}</h3>
        `
        cardCarrito.className = "cardCarrito" 

        carritoContenedor.appendChild(cardCarrito)
    }
}


//Le colocamos un evento que lo almecena el button que .target captura la posicion y con getaatribute le asignamos un id
//producto,id lo parseamos 
//En productoencarrito aplicamos find que si item.id coinsicide con producto.id verificamos si el producto esta en el carrito
//usamos condicionales q si el producto esta en el carrito me lo agregue y no me cree otro array nuevo pero si no, si que me agregue el producto al carrito
// Tambien genere localstorage para que se almacen mi id alli y no se pieda la info, tmb un prompt para que cuando agregues al carrito te aparezca
function agregarAlCarrito(event) {
    let button = event.target
    let productoId = button.getAttribute("data-producto-id")

    let producto = productos.find((producto) => producto.id == parseInt(productoId))

    let productoEnCarrito = carrito.find((item) => item.id == producto.id)


    productoEnCarrito ? productoEnCarrito.cantidad += producto.cantidad : carrito.push({...producto})


    console.log(`producto agregado al carrito. ID:  ${productoId}`)
    console.log("carrito", carrito)

    localStorage.setItem("carrito", JSON.stringify(carrito));
    
    Swal.fire(
        'Has agregado este producto al carrito!',  
      )
    actualizarCarrito()
}


