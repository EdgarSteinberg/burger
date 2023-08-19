// Selecciona el botón con el id "boton" en el DOM
let boton = document.querySelector("#boton")
// Agrega un evento de clic al botón
boton.addEventListener("click", () => {
    // Verifica el tema almacenado en el LocalStorage
    if (localStorage.getItem("theme") == "dark") {
        lightMode()
    } else {
        darkMode()
    }
})
// Función para activar el modo oscuro
function darkMode() {
    let body = document.querySelector("body")
    body.classList.add("dark-theme")// Agrega una clase para el fondo oscuro 
    localStorage.setItem("theme", "dark") // Almacena el tema en el LocalStorage

}
// Función para activar el modo claro
function lightMode() {
    let body = document.querySelector("body")
    body.classList.remove("dark-theme")// Remueve la clase del fondo oscuro
    localStorage.setItem("theme", "light")// Almacena el tema en el LocalStorage
}
// Agrega un evento cuando el DOM se ha cargado
document.addEventListener("DOMContentLoaded", () => {
    // Verifica el tema almacenado y aplica el modo correspondiente
    if (localStorage.getItem("theme") == "dark") {
        darkMode()
    } else {
        lightMode()
    }
})