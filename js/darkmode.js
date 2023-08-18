let boton = document.querySelector("#boton")

boton.addEventListener("click", () => {
    if (localStorage.getItem("theme") == "dark") {
        lightMode()
    } else {
        darkMode()
    }
})

function darkMode() {
    let body = document.querySelector("body")
    body.style.backgroundColor = "black"

    localStorage.setItem("theme", "dark")
}

function lightMode() {
    let body = document.querySelector("body")
    body.style.backgroundColor = "white"

    localStorage.setItem("theme", "light")
}

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("theme") == "dark") {
        darkMode()
    } else {
        lightMode()
    }
})