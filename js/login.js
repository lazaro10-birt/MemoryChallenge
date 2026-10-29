
import { cargarJSON } from "./cargar-datos.js";

let usuarios = [];

const botonEnviar = document.querySelector('#formLogin button[type="submit"]');

botonEnviar.disabled = true;

cargarJSON("./data/usuarios.json", function(datos){
    usuarios = datos;

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    botonEnviar.disabled = false;

    console.log("Usuarios cargados correctamente:", usuarios);
});






const formulario = document.getElementById("formLogin");
const campoUsuario = document.getElementById("usuario");
const campoContrasena = document.getElementById("contrasena");
const mensaje = document.getElementById("mensaje");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const usuarioIntroducido = campoUsuario.value.trim();
    const contrasenaIntroducida = campoContrasena.value;

    const patronContrasena = /^[a-zA-Z0-9]+$/;

    if (!patronContrasena.test(contrasenaIntroducida)) {
        mensaje.textContent =
            "La contraseña solo puede contener letras y números.";
        return;
    }

    const usuarioValido = usuarios.find(function(usuario) {
        return usuario.usuario === usuarioIntroducido &&
            usuario["contraseña"] === contrasenaIntroducida;
    });

    if (!usuarioValido) {
        mensaje.textContent = "Usuario o contraseña incorrectos.";
        return;
    }

    sessionStorage.setItem("usuarioActual", JSON.stringify({
        id: usuarioValido.id,
        nombre: usuarioValido.nombre,
        usuario: usuarioValido.usuario
    }));

    window.location.href = "views/bienvenida.html";
});
