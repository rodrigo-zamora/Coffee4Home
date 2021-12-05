let misOrdenes = document.getElementById('barMyOrders');
misOrdenes.addEventListener("click", sendToOrders);

function sendToOrders()  {
    window.location.href = "/orders";
}