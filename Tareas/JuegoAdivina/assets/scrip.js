let numeroSecreto;
let intentosRestantes;

function iniciarJuego() {
    numeroSecreto = Math.floor(Math.random() * 100) + 1; // Número aleatorio entre 1 y 100
    intentosRestantes = 3;
    document.getElementById("resultado").textContent = "¡Tienes 3 intentos para adivinar el número!";
    document.getElementById("numeroIntento").value = "";
}

function adivinarNumero() {
    const intento = parseInt(document.getElementById("numeroIntento").value);
    if (isNaN(intento)) {
        document.getElementById("resultado").textContent = "Por favor, introduce un número válido.";
        return;
    }

    if (intentosRestantes > 0) {
        if (intento === numeroSecreto) {
            document.getElementById("resultado").textContent = "¡Felicidades! Adivinaste el número.";
        } else {
            intentosRestantes--;
            if (intentosRestantes === 0) {
                document.getElementById("resultado").textContent = `¡Lo siento! El número era ${numeroSecreto}.`;
            } else {
                const pista = intento < numeroSecreto ? "mayor" : "menor";
                document.getElementById("resultado").textContent = `Incorrecto. El número es ${pista}. Te quedan ${intentosRestantes} intentos.`;
            }
        }
    }
}

document.getElementById("botonAdivinar").addEventListener("click", adivinarNumero);
document.getElementById("botonReiniciar").addEventListener("click", iniciarJuego);

window.onload = iniciarJuego;