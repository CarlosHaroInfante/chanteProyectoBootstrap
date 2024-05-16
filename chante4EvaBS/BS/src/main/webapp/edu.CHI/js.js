/**
 * 
 */

  function validarFormulario() {
            var email = document.getElementById("email").value;
            var username = document.getElementById("username").value;
            var password = document.getElementById("password").value;
            var confirmPassword = document.getElementById("confirmPassword").value;

            // Validar que las contraseñas coincidan
            if (password !== confirmPassword) {
                alert("Las contraseñas no coinciden");
                return false;
            }

            // Si todo está correcto, puedes enviar el formulario
            alert("Registrado correctamente");
            return true;
        }
 

// Funciones relacionadas con el carrito.
function getCartCount() {
    var count = localStorage.getItem('cartCount'); //Guarda la cantidad del carrito.
    return count ? parseInt(count) : 0;
}

function guardarCarritoCantidad(count) {
    localStorage.setItem('cartCount', count); //Guarda la cantidad para que no se pierda entre páginas
}

function AñadirCarrito(producto) { //Añade producto a carrito
    var counter = getCartCount();
    counter++;
    guardarCarritoCantidad(counter);
    document.getElementById('contador-carrito').textContent = counter;
}

// Llama a calcular total al iniciar la página
document.addEventListener('DOMContentLoaded', function() {
	
    // Obtiene la referencia
    const contadorCarrito = document.getElementById('contador-carrito');

    // Escuchar clics en los botones "Agregar al carrito"
    const botonesAgregarCarrito = document.querySelectorAll('.agregar-carrito');
    botonesAgregarCarrito.forEach(boton => {
        boton.addEventListener('click', () => {
            const producto = boton.getAttribute('data-producto');
            let cantidad = parseInt(contadorCarrito.textContent);// Obtiene el valor del contador.
            cantidad++;// Suma 1 al contador
            contadorCarrito.textContent = cantidad; // Actualizar el texto del contador
            addToCart(producto);
            calcularTotal(); 
        });
    });

    // Recupera el numero anterior de clics para que no se pierdan al recargar la página.
    var counter = getCartCount(); //Coge la cantidad de la funcion getCartCount
    contadorCarrito.textContent = counter;

    // Limpia el carrito.
    document.getElementById('clear-cart-button').addEventListener('click', function() {
        contadorCarrito.textContent = '0'; //Pasa el número a 0.
        guardarCarritoCantidad(0); // Guardar el contador.
    });
});
