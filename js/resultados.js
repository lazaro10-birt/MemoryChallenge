
const resultado = sessionStorage.getItem("resultado");
const puntuacion = sessionStorage.getItem("puntuacion");
const tiempoRestante = sessionStorage.getItem("tiempoRestante");
const parejas = sessionStorage.getItem("parejasEncontradas");

const tituloResultado = document.getElementById("tituloResultado");
const mensajeResultado = document.getElementById("mensajeResultado");
const puntuacionFinal = document.getElementById("puntuacionFinal");
const tiempoFinal = document.getElementById("tiempoFinal");
const parejasFinal = document.getElementById("parejasFinal");

if (resultado === "victoria") {
    tituloResultado.textContent = "¡Has ganado!";
    mensajeResultado.textContent = "¡Excelente memoria y rapidez!";
} else {
    tituloResultado.textContent = "¡Se acabó el tiempo!";
    mensajeResultado.textContent = "No has conseguido encontrar todas las parejas.";
}

puntuacionFinal.textContent = puntuacion ?? "0";
tiempoFinal.textContent = tiempoRestante ?? "0";
parejasFinal.textContent = parejas ?? "0";

document.getElementById("btnJugarOtraVez").addEventListener("click", function() {
    window.location.href = "bienvenida.html";
});

document.getElementById("btnSalir").addEventListener("click", function() {
    sessionStorage.removeItem("nivelSeleccionado");
    sessionStorage.removeItem("puntuacion");
    sessionStorage.removeItem("resultado");
    sessionStorage.removeItem("tiempoRestante");
    sessionStorage.removeItem("parejasEncontradas");

    window.location.href = "../index.html";
});

