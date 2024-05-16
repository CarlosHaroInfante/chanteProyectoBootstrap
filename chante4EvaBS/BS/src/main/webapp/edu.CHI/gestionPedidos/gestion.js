document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const table = document.querySelector("#lista-pedidos");
    const tbody = document.querySelector("#lista-pedidos tbody");

   
    const pedidosRealizados = JSON.parse(localStorage.getItem("orders")) || [];  // Verificar los productos y los carga.
    pedidosRealizados.forEach(order => {
        const filaNueva = crearProducto(order);
        tbody.appendChild(filaNueva);
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const usuario = document.getElementById("usuario").value;
        const producto = document.getElementById("producto").value;
        const ciudad = document.getElementById("ciudad").value;
        const fecha = document.getElementById("fecha").value;

        const nuevoPedido = { //Crea un nuevoPedido
            usuario: usuario,
            producto: producto,
            ciudad: ciudad,
            fecha: fecha
        };

        const filaNueva = crearProducto(nuevoPedido); //Crea una fila con el producto nuevo añadido.
        tbody.appendChild(filaNueva); //Lo añade al tbody

        
        pedidosRealizados.push(nuevoPedido); // Guardar el nuevo pedido en el almacenamiento local
        localStorage.setItem("orders", JSON.stringify(pedidosRealizados));

        form.reset();
    });

    table.addEventListener("click", function (event) { //Borra la fila del producto
        if (event.target.classList.contains("delete-btn")) {
            const fila = event.target.closest("tr");
            const index = Array.from(tbody.children).indexOf(fila);

            // Eliminar el pedido del arreglo y del almacenamiento local
            pedidosRealizados.splice(index, 1);
            localStorage.setItem("orders", JSON.stringify(pedidosRealizados));

            fila.remove();
        }
    });
});

function crearProducto(order) {
    const filaNueva = document.createElement("tr");
    filaNueva.innerHTML = `
        <td>${order.usuario}</td>
        <td>${order.producto}</td>
        <td>${order.ciudad}</td>
        <td>${order.fecha}</td>
        <td>
            <button class="btn btn-danger delete-btn">Eliminar</button>
        </td>
    `;
    return filaNueva;
}
