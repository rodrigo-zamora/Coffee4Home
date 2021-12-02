let ordersContainer = document.getElementById("ordersContainer");

document.addEventListener("load", updatePage());

function searchToken() {
    let token = localStorage.getItem('token');
    if (token == null) {
        return false;
    } else {
        return true;
    }
}

function orderToHTML(order) {
    return `
    <a style="width: 100%; text-decoration: none !important; color: black;">
                <div class="card" style="width: 100%;">
                    <div class="card-header ">
                        <div class="coffeeproduct">Pedido Realizado</div>
                        <div class="coffeeproduct">Total</div>
                        <div class="coffeeproduct">Enviar a</div>
                        <div class="coffeeproduct">Pedido N°2194819121349013449</div>
                    </div>
                    <div class="card-header">
                        Entregado el viernes, 12 de junio
                    </div>
                    <div class="productContainer">
                        <div class="row productRow">
                            <div class="coffeeImg col-md-2">
                                <img class="productImg" src="resources/coffeeItems/kenyaAA.jpeg" alt="Peet's Coffee">
                            </div>
                            <div class="coffeeIntormation col-md-7">
                                <h4>Kenya AA</h4>
                                <p class="productText"><b>Marca:</b> Java House Africa.</p>
                                <p class="productText"><b>Tipo de café:</b> Molido.</p>
                                <p class="productText"><b>Tipo de grano:</b> Arábico.</p>
                                <p class="productText"><b>Origen:</b> Kenya.</p>
                                <p class="productText"><b>Tipo:</b> Origen único.</p>
                                <p class="productText"><b>Sabor:</b> Fresco y floral.</p>
                                <p class="productText"><b>Preparación recomendada:</b> Goteo.</p>
                            </div>
                            <div class="buttons col-md-2">
                                <div>
                                    <button type="button" class="cancel-button btn btn-success"
                                        data-dismiss="modal">Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
    `;
}
    /*
    <button type="button" class="accept-button btn btn-success"
    data-dismiss="modal">Aceptar</button>
    <button type="button" class="reject-button btn btn-success"
    data-dismiss="modal">Rechazar</button>
    */
function updatePage() {
    if (!searchToken()) {

        // Make a request to know if the user is an admin
        let email = "rodrigo.zamora@coffe4home.com";
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let user = JSON.parse(this.responseText);
                if (user.role == "ADMIN") {
                    window.location.href = "/allOrders";
                }
            }
        };
        xhttp.open("GET", "users/" + email, true);
        xhttp.send();

        // Only users without admin privileges can see this page
        // Make a request to get all the orders of the user
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let orders = JSON.parse(this.responseText);
                console.log(orders);
                if (orders == null || orders.length == 0 || orders == undefined) {
                    console.log("No hay pedidos");
                    ordersContainer.innerHTML = "No has realizado ninguna orden";
                } else {
                    ordersContainer.innerHTML = "";
                    for (let i = 0; i < orders.length; i++) {
                        ordersContainer.innerHTML += orderToHTML(orders[i]);
                    }
                }
            }
        };
        xhttp.open("GET", "orders/" + email, true);
        xhttp.send();

    } else {
        alert("You must be logged in to access this page");
        window.location.href = "/";
    }
}