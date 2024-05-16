
// Calcula el subtotal y el total cuando cambia la cantidad
document.querySelectorAll('.cantidad').forEach(input => {
    input.addEventListener('change', calcularTotal);
});

// Función para calcular el precio en el carrito
function calcularTotal() {
    let subtotal = 0;

    document.querySelectorAll('.precio').forEach(precioElemento => {
        const precio = parseFloat(precioElemento.getAttribute('data-precio'));
        const cantidadInput = precioElemento.closest('tr').querySelector('.cantidad');
        const cantidad = parseInt(cantidadInput.value);
        subtotal += precio * cantidad;
    });

    const shipping = 2.99;
    const total = subtotal + shipping;

    document.getElementById('subtotal').textContent = subtotal.toFixed(2) + '€';
    document.getElementById('total').textContent = total.toFixed(2) + '€';
    document.getElementById('checkoutTotal').textContent = total.toFixed(2) + '€';

    guardarCantidades();
}

// Guarda las cantidades en el almacenamiento local
function guardarCantidades() {
    const cantidades = {};
    document.querySelectorAll('.cantidad').forEach(input => {
        const id = input.getAttribute('id');
        const cantidad = input.value;
        cantidades[id] = cantidad;
    });
    localStorage.setItem('cantidades', JSON.stringify(cantidades));
}

// Evento para procesar el pago
document.getElementById("btnPagar").addEventListener("click", function() {
    var nombreTarjeta = document.getElementById("typeName").value;
    var numeroTarjeta = document.getElementById("typeText").value;
    var expiracion = document.getElementById("typeExp").value;
    var cvv = document.getElementById("typeCvv").value;

    // Expresiones regulares para validar los datos de la tarjeta
    var regexNombre = /^[a-zA-Z\s]+$/; //Hace que solo puedan ser letras
    var regexNumero = /^[0-9\s]+$/; //Hace que solo puedan ser numeros.
    
    var isValid = true;
    
    
    if (!regexNombre.test(nombreTarjeta)) { //Valida el nombre de la tarjeta
        isValid = false;
        alert("Por favor, ingresa un nombre de tarjeta válido.");
        return;
    }
    
    
    if (!regexNumero.test(numeroTarjeta) || numeroTarjeta.length !== 16) { //Valida el num de la tarjeta y deben de ser 16 digitos.
        isValid = false;
        alert("Por favor, ingresa un número de tarjeta válido de 16 dígitos.");
        return;
    }
    
    
    if (!regexNumero.test(cvv)){ //Valida el cvv
        isValid = false;
        alert("El CVV solo puede contener números.");
        return;
    }
    
    
    var fechaActual = new Date();
    var mesActual = fechaActual.getMonth() + 1;
    var añoActual = fechaActual.getFullYear();
    var expiracionSplit = expiracion.split('/');
    var expiracionMes = parseInt(expiracionSplit[0]);
    var expiracionAño = parseInt(expiracionSplit[1]);
    
    
    if (expiracionSplit.length !== 2 || expiracionSplit[0].length !== 2 || expiracionSplit[1].length !== 4) { //Comprueba la longitud de el MM/YYYY con ese formato.
        isValid = false;
        alert("Por favor, ingresa la fecha de expiración en formato MM/YYYY.");
        return;
    }

    if (expiracionAño < añoActual || (expiracionAño === añoActual && expiracionMes < mesActual)) { //Comparación de fechas.
        isValid = false;
        alert("La fecha de expiración no puede ser anterior al mes y año actual.");
        return;
    }
    
    
    if (isValid) {
        alert("Pago exitoso. ¡Gracias por su compra!");

        
        document.querySelectorAll('.cantidad').forEach(input => {
            input.value = 0;// Vuelve la cantidad a 0 al pulsar el boton de pagar
        });

       
        calcularTotal(); // Vuelve a calcular el total
    }
});



window.addEventListener('load', () => { //Recuperar las cantidades de modo local al recargar la pag.
    const cantidadesGuardadas = JSON.parse(localStorage.getItem('cantidades'));
    if (cantidadesGuardadas) {
        // Busca las cantidades guardadas
        Object.keys(cantidadesGuardadas).forEach(id => {
            const cantidad = parseInt(cantidadesGuardadas[id]); //Pasa la cantidad guardada de cada producto por el id del mismo.
            const input = document.getElementById(id);
            if (input) {
                input.value = cantidad;
            }
        });
        // Calcular el total al cargar la página
        calcularTotal();
    }
});
