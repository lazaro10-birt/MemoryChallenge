
const selectorNivel = document.getElementById("nivel");
const descripcionNivel = document.getElementById("descripcionNivel");
const botonInicio = document.getElementById("btnIniciar");

const niveles = {
    principiante: {
        filas: 3,
        columnas: 4,
        parejas: 6
    },
    intermedio: {
        filas: 4,
        columnas: 4,
        parejas: 8
    },
    avanzado: {
        filas: 4,
        columnas: 5,
        parejas: 10
    }
};

//Actualizamos la descripción al cambiar de nivel
selectorNivel.addEventListener("change", function() {
    const nivel = niveles[selectorNivel.value];

    descripcionNivel.textContent = `${nivel.parejas}parejas . ${nivel.filas * nivel.columnas} cartas`;
});

//Guardamos la dificultad y abrimos el juego.
botonInicio.addEventListener("click", function() {
    sessionStorage.setItem("nivelSeleccionado", selectorNivel.value);
    sessionStorage.setItem("puntuacion", "0");

    window.location.href = "juego.html";
});