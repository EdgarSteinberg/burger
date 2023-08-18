let form = document.querySelector("form")
/* let submitbutton = form.querySelector('button[type="submit"]') */
let submitButton = form.querySelector('button[type="submit"]');


form.addEventListener("submit", function (e){
    e.preventDefault()


let nombreApellido = form.querySelector("#nombreApellido").value
let telefono = form.querySelector("#telefono").value
let email = form.querySelector("#email").value
let direccion = form.querySelector("#direccion").value
let consulta = form.querySelector("#consulta").value


let datoUsuario = {
    nombreApellido: nombreApellido,
    telefono: telefono,
    email: email,
    direccion: direccion,
    consulta: consulta
}

let registros = []

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
        if(localStorage.getItem("registros")){
            registros = JSON.parse(localStorage.getItem("registros"))
        }else{
            registros.push(datoUsuario)
            localStorage.setItem("registros", JSON.stringify(datoUsuario))
        }
        /* form.submit(); */
        form.reset()
    }
});
form.reset()


})



