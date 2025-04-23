console.log("El archivo script.js está cargado correctamente.");

// Variables
const display = document.getElementById("display");
let currentInput = "";
let previousInput = "";
let operator = "";

// Función para actualizar el display
function updateDisplay(value) {
    display.value = value;
}

// Función para manejar los números y el punto
function appendNumber(number) {
    if (number === "." && currentInput.includes(".")) return; // Evita múltiples puntos decimales
    currentInput += number;
    updateDisplay(currentInput);
}

// Función para manejar los operadores
function chooseOperator(op) {
    if (currentInput === "") return; // No permite operadores sin un número
    if (previousInput !== "") {
        calculate(); // Calcula si ya hay una operación pendiente
    }
    operator = op;
    previousInput = currentInput;
    currentInput = "";
}

// Función para realizar el cálculo
function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return; // Evita cálculos inválidos

    switch (operator) {
        case "+":
            result = prev + current;
            break;
        case "-":
            result = prev - current;
            break;
        case "*":
            result = prev * current;
            break;
        case "/":
            result = current === 0 ? "Error" : prev / current; // Maneja división por cero
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = "";
    previousInput = "";
    updateDisplay(currentInput);
}

// Función para limpiar todo
function clearAll() {
    currentInput = "";
    previousInput = "";
    operator = "";
    updateDisplay("");
}

// Función para borrar el último dígito
function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput);
}

// Event listeners para los botones
document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
        const { id, classList } = button;

        if (classList.contains("operator")) {
            if (id === "ac") {
                clearAll(); // Botón AC
            } else if (id === "de") {
                deleteLast(); // Botón DE
            } else if (id === "equal") {
                calculate(); // Botón =
            } else {
                chooseOperator(button.textContent); // Otros operadores
            }
        } else {
            appendNumber(button.textContent); // Números y punto
        }
    });
});