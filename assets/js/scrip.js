// Agregamos un evento al formulario para capturar el envío
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitamos que el formulario se envíe automáticamente

    // Capturamos los valores de los campos
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const reason = document.getElementById('reason').value;
    const message = document.getElementById('message').value.trim();

    // Capturamos los elementos de error
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const reasonError = document.getElementById('reasonError');
    const messageError = document.getElementById('messageError');

    // Reiniciamos los mensajes de error
    nameError.style.display = 'none';
    emailError.style.display = 'none';
    reasonError.style.display = 'none';
    messageError.style.display = 'none';

    let isValid = true;

    // Validamos el campo "Nombre / Apellido"
    if (!name) {
        nameError.textContent = 'Este campo es obligatorio.';
        nameError.style.display = 'block';
        isValid = false;
    }

    // Validamos el campo "Email"
    if (!email) {
        emailError.textContent = 'Este campo es obligatorio.';
        emailError.style.display = 'block';
        isValid = false;
    } else {
        // Validación del formato del correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            emailError.textContent = 'Por favor, ingresa un correo electrónico válido.';
            emailError.style.display = 'block';
            isValid = false;
        }
    }

    // Validamos el campo "Motivo de la consulta"
    if (!reason) {
        reasonError.textContent = 'Por favor, selecciona un motivo de consulta.';
        reasonError.style.display = 'block';
        isValid = false;
    }

    // Validamos el campo "Mensaje"
    if (!message) {
        messageError.textContent = 'Este campo es obligatorio.';
        messageError.style.display = 'block';
        isValid = false;
    }

    // Si todo es válido, mostramos un mensaje de éxito
    if (isValid) {
        const feedback = document.getElementById('formFeedback');
        feedback.textContent = '¡Gracias por tu mensaje!';
        feedback.style.color = 'green';
        this.reset(); // Reiniciamos el formulario
    }
});

// Seleccionar todos los enlaces del menú y las secciones
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('.section, .form-section');

// Añadir evento de clic a cada enlace
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); // Evitar el comportamiento predeterminado del enlace

        // Obtener el id de la sección a mostrar
        const targetId = this.getAttribute('href').substring(1);

        // Ocultar todas las secciones
        sections.forEach(section => {
            section.classList.add('hidden');
        });

        // Mostrar la sección correspondiente
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.remove('hidden');
        }
    });
});
// Obtener elementos del DOM
const modal = document.getElementById("contactModal");
const openModalButton = document.querySelector("a[href='#contact']"); // Botón para abrir el modal
const closeModalButton = document.querySelector(".close");

// Abrir el modal
openModalButton.addEventListener("click", (event) => {
    event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
    console.log("Abriendo modal"); // Depuración
    modal.style.display = "block";
});

// Cerrar el modal
closeModalButton.addEventListener("click", () => {
    console.log("Cerrando modal"); // Depuración
    modal.style.display = "none";
});

// Cerrar el modal al hacer clic fuera del contenido
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});
document.querySelectorAll('.view-more').forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1); // Obtener el ID del taller
        const targetDiv = document.getElementById(targetId);

        // Alternar la clase "active" para mostrar/ocultar el contenido
        if (targetDiv.classList.contains('active')) {
            targetDiv.classList.remove('active');
        } else {
            targetDiv.classList.add('active');
        }
    });
});
document.querySelectorAll('.dropdown').forEach(toggle => {
    toggle.addEventListener('click', function (event) {
        event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
        const parent = this.parentElement;

        // Cerrar otros menús abiertos
        document.querySelectorAll('.nav-item.dropdown').forEach(item => {
            if (item !== parent) {
                item.classList.remove('active');
            }
        });

        // Alternar el menú actual
        parent.classList.toggle('active');
    });
});

// Cerrar el menú si se hace clic fuera de él
document.addEventListener('click', function (event) {
    if (!event.target.closest('.nav-bar')) {
        document.querySelectorAll('.nav-item.dropdown').forEach(item => {
            item.classList.remove('active');
        });
    }
});
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
document.addEventListener('DOMContentLoaded', () => {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const dropdownMenu = toggle.nextElementSibling;

            // Cerrar otros menús abiertos
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                if (menu !== dropdownMenu) {
                    menu.style.display = 'none';
                }
            });

            // Alternar el menú actual
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        });
    });

    // Cerrar el menú si se hace clic fuera
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-item')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.display = 'none';
            });
        }
    });
});
