//recuperamos el nivel elegido en la pantalla de bienvenido.
const nivelSeleccionado = sessionStorage.getItem("nivelSeleccionado");

//configuramos la característica de cada nivel

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

//Recuperamos la configuración del nivel seleccionado.
const configuracion = niveles[nivelSeleccionado];

//Obtenemos los elementos HTML que vamos a utilizar.
const tablero = document.getElementById("tablero");
const tiempo = document.getElementById("tiempo");
const parejasEncontradas = document.getElementById("parejasEncontradas");
const nivelActual = document.getElementById("nivelActual");
const mensajeJuego = document.getElementById("mensajeJuego");

console.log("Nivel seleccionado:", nivelSeleccionado);
console.log("Configuración:", configuracion);

//Mostramos el nombre del nivel
nivelActual.textContent = nivelSeleccionado;


// Símbolos que utilizaremos para las cartas.
const simbolos = [
    "🍎", "🍋", "🍇", "🍉", "🍓",
    "🍒", "🥝", "🍍", "🥥", "🍑"
];

// Indicamos cuántas columnas tendrá el tablero.
tablero.style.gridTemplateColumns =
    `repeat(${configuracion.columnas}, minmax(0, 1fr))`;


//Mostramos las carta necesarias para el nivel elegido
const cartas = simbolos.slice(0, configuracion.parejas);

//cada simbolo debe aparecer dows veces para formar una pareja.
const mazo = [...cartas, ...cartas];

//Mezclamos las cartas aleatoriamente
mazo.sort(() => Math.random() - 0.5);

//Creamos una carta HTML por cada elemento de mazo.
mazo.forEach(function(simbolo, indice) {
    const carta = document.createElement("button");

    carta.type = "button";
    carta.classList.add("carta");
    carta.textContent = "?";
    carta.dataset.simbolo = simbolo;
    carta.dataset.indice = indice;


    tablero.appendChild(carta);
});





let primeraCarta = null;
let segundaCarta = null;
let bloqueo = false;
let parejas = 0;


function guardarEstadoPartido(){
    sessionStorage.setItem("nivelSeleccionado", nivelSeleccionado);
    sessionStorage.setItem("puntuacion", String(segundosRestantes * 100));
    sessionStorage.setItem("tiempoRestante", String(segundosRestantes));
    sessionStorage.setItem("parejasEncontradas", String(parejas));
}



const todasLasCartas = document.querySelectorAll(".carta"); 

todasLasCartas.forEach(function(carta) {



    
    //Evento 1. Resalta la carta al pasar el ratón.
    carta.addEventListener("mouseover", function(){
        carta.style.borderColor = "#67e8f9";
        carta.style.transform = "translateY(-3px)";
    });

    //Evento 2. Quitamos el resaltador al salir el ratón.
    carta.addEventListener("mouseout", function(){
        carta.style.borderColor = "";
        carta.style.transform = "";
    });

    //Evento 3. Detectaa cuando se suelta el boton del ratón.
    carta.addEventListener("mouseup", function(){
        carta.style.opacity = "0.85";

        setTimeout(function() {
            carta.style.opacity = "";

        }, 150);
    })


    carta.addEventListener("click", function(){
        //No permitira clics mientras comprobamos una pareja.
        if(bloqueo || carta.classList.contains("descubierta")){
            return;
        }

        //mostras el simbolo de la carta.
        carta.textContent = carta.dataset.simbolo;
        carta.classList.add("descubierta");

        //guardar la primera carta seleccionada.
        if(primeraCarta === null){
            primeraCarta = carta;
            return;
        }
        //guardamos la segunda carta.
        segundaCarta = carta;

        //comprobamos si los signo coinciden.
        if (primeraCarta.dataset.simbolo === segundaCarta.dataset.simbolo){
            parejas++;
            parejasEncontradas.textContent = parejas;
            guardarEstadoPartido();

            if(parejas === configuracion.parejas){
                finalizarPartida(true);
            }

            primeraCarta = null;
            segundaCarta = null;
        }else {
            bloqueo = true; 

            setTimeout(function() {
                primeraCarta.textContent = "?";
                segundaCarta.textContent = "?";

                primeraCarta.classList.remove("descubierta");
                segundaCarta.classList.remove("descubierta");

                primeraCarta = null;
                segundaCarta = null;
                bloqueo = false;
        }, 1000);
        }
    });
});




let partidaFinalizada = false;

function finalizarPartida(ganada){
    if(partidaFinalizada){
        return;
    }

    partidaFinalizada = true;
    clearInterval(cronometro);

    const puntuacionFinal = ganada  ? segundosRestantes *100 : 0;

    sessionStorage.setItem("resultado", ganada ? "victoria" : "derrota");
    sessionStorage.setItem("puntuacion", String(puntuacionFinal));
    sessionStorage.setItem("tiempoRestante", String(segundosRestantes));
    sessionStorage.setItem("parejasEncontradas", String(parejas));

    window.location.href = "resultados.html"
}



//Establecemos tiempo 
let segundosRestantes  = 30;
tiempo.textContent = segundosRestantes;
guardarEstadoPartido();

//Ejecutara una funcion cada 1.000 milisegundos, es decir, cada segundo
const cronometro = setInterval(function() {
    segundosRestantes--; //resta un segundo
    tiempo.textContent  = segundosRestantes; //Actualiza el numero que se ve en la pantalla

    guardarEstadoPartido();

    //Funcion para ir valorando nuestra variable
    if(segundosRestantes <= 0){
        segundosRestantes = 0;
        tiempo.textContent = segundosRestantes;
        finalizarPartida(false);
    }
}, 1000);

