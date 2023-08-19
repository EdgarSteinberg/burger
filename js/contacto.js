let form = document.querySelector("form")
// Selecciona el botón de envío dentro del formulario
let submitButton = form.querySelector('button[type="submit"]');


form.addEventListener("submit", function (e) {
    e.preventDefault()// Evita que el formulario se envíe por defecto

    // Captura los valores de los campos del formulario
    let nombreApellido = form.querySelector("#nombreApellido").value
    let telefono = form.querySelector("#telefono").value
    let email = form.querySelector("#email").value
    let direccion = form.querySelector("#direccion").value
    let consulta = form.querySelector("#consulta").value

    // Crea un objeto con los datos del usuario
    let datoUsuario = {
        nombreApellido: nombreApellido,
        telefono: telefono,
        email: email,
        direccion: direccion,
        consulta: consulta
    }
    // Array para almacenar registros
    let registros = []
    // Muestra una ventana modal de confirmación usando SweetAlert
    Swal.fire({
        title: 'Desea enviar el formulario?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, continua!',


    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Continuando!',
                'Tus datos han sido enviados.',
                'success'
            );
            if (localStorage.getItem("registros")) {
                registros = JSON.parse(localStorage.getItem("registros"))
            } else {
                registros.push(datoUsuario)
                localStorage.setItem("registros", JSON.stringify(datoUsuario))
            }
            // Reinicia el formulario después de enviar
            form.reset()
        }
    });
    form.reset()


})



