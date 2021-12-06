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

function requestCancelOrder(order) {
    console.log("requestCancelOrder");
    let myOrder = order[0];
    myOrder.orderStatus = "PENDING";
    // Make a post request to modify order status
    let xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/admin/orders/" + myOrder.orderUUID, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader("x-auth", "admin");
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("Solcitud de cancelacion enviada");
            window.location.reload();
        }
    };
    xhttp.send(JSON.stringify(myOrder));
}

function cancelOrder(orderUUID) {
    console.log("cancelOrder");
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            requestCancelOrder(JSON.parse(this.responseText));
        }
    };
    xhttp.open("GET", "orders/" + orderUUID, true);
    xhttp.setRequestHeader("isOrder", "true");
    xhttp.send();
}

function requestAcceptOrder(order) {
    console.log("requestAcceptOrder");
    let myOrder = order[0];
    myOrder.orderStatus = "ACCEPTED";
    // Make a post request to modify order status
    let xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/admin/orders/" + myOrder.orderUUID, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader("x-auth", "admin");
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("Solcitud de aceptacion enviada");
            window.location.reload();
        }
    };
    xhttp.send(JSON.stringify(myOrder));
}

function acceptOrder(orderUUID) {
    console.log("acceptOrder");
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            requestAcceptOrder(JSON.parse(this.responseText));
        }
    };
    xhttp.open("GET", "orders/" + orderUUID, true);
    xhttp.setRequestHeader("isOrder", "true");
    xhttp.send();
}

function requestRejectOrder(order) {
    console.log("requestRejectOrder");
    let myOrder = order[0];
    myOrder.orderStatus = "REJECTED";
    // Make a post request to modify order status
    let xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/admin/orders/" + myOrder.orderUUID, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader("x-auth", "admin");
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("Solcitud de rechazo enviada");
            window.location.reload();
        }
    };
    xhttp.send(JSON.stringify(myOrder));
}

function rejectOrder(orderUUID) {
    console.log("rejectOrder");
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            requestRejectOrder(JSON.parse(this.responseText));
        }
    };
    xhttp.open("GET", "orders/" + orderUUID, true);
    xhttp.setRequestHeader("isOrder", "true");
    xhttp.send();
}

function orderToHTML(order, isAdmin) {
    if (isAdmin) {
        switch (order.orderStatus) {
            case "PENDING":
                return `
                <a style="width: 100%; text-decoration: none !important; color: black;">
                            <div class="card" style="width: 100%;">
                                <div class="orderHeader card-header ">
                                    <div id="orderInfo">
                                    <div class="coffeeproduct">Pedido realizado</div>
                                    <div class="coffeeproduct">Total: ${order.orderTotal}</div>
                                    <div class="coffeeproduct">Pedido: #${order.orderUUID}</div>
                                    <div class="coffeeproduct">Fecha del pedido: ${order.orderDate}</div>
                                    <div class="coffeeproduct">Estado: ${order.orderStatus}</div>
                                    </div>
                                    <div class="buttons">
                                    <div>
                                        <button type="button" class="cancel-button btn btn-success"
                                            data-dismiss="modal" id="cancelOrder" onclick="aceptOrder('${order.orderUUID}')">Aceptar</button>
                                    </div>
                                    <div class="buttons">
                                    <div>
                                        <button type="button" class="cancel-button btn btn-success"
                                            data-dismiss="modal" id="cancelOrder" onclick="rejectOrder('${order.orderUUID}')">Rechazar</button>
                                    </div>
                                </div>
                            </div>
                        </a>
                `;
        }
    } else {
        switch (order.orderStatus) {
            case "PENDING" || "DELIVERED":
                return `
                <a style="width: 100%; text-decoration: none !important; color: black;">
                            <div class="card" style="width: 100%;">
                                <div class="orderHeader card-header ">
                                    <div id="orderInfo">
                                    <div class="coffeeproduct">Pedido realizado</div>
                                    <div class="coffeeproduct">Total: ${order.orderTotal}</div>
                                    <div class="coffeeproduct">Pedido: #${order.orderUUID}</div>
                                    <div class="coffeeproduct">Fecha del pedido: ${order.orderDate}</div>
                                    <div class="coffeeproduct">Estado: ${order.orderStatus}</div>
                                    </div>
                                </div>
                            </div>
                        </a>
                `;
            case "CONFIRMED":
                return `
                <a style="width: 100%; text-decoration: none !important; color: black;">
                            <div class="card" style="width: 100%;">
                                <div class="orderHeader card-header ">
                                    <div id="orderInfo">
                                    <div class="coffeeproduct">Pedido realizado</div>
                                    <div class="coffeeproduct">Total: ${order.orderTotal}</div>
                                    <div class="coffeeproduct">Pedido: #${order.orderUUID}</div>
                                    <div class="coffeeproduct">Fecha del pedido: ${order.orderDate}</div>
                                    <div class="coffeeproduct">Estado: ${order.orderStatus}</div>
                                    </div>
                                    <div class="buttons">
                                    <div>
                                        <button type="button" class="cancel-button btn btn-success"
                                            data-dismiss="modal" id="cancelOrder" onclick="cancelOrder('${order.orderUUID}')">Cancelar</button>
                                    </div>
                                </div>
                            </div>
                        </a>
                `;
        }
    }
}
    /*
    <button type="button" class="accept-button btn btn-success"
    data-dismiss="modal">Aceptar</button>
    <button type="button" class="reject-button btn btn-success"
    data-dismiss="modal">Rechazar</button>
    */
function updatePage() {
    if (searchToken()) {

        // Make a request to know if the user is an admin
        let email = localStorage.getItem('email');
        console.log(email);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let user = JSON.parse(this.responseText);
                console.log(user.role);
                if (user.role == "ADMIN") {
                    loadAllOrders(user);
                } else {
                    loadUserOrders(user);
                }
            }
        };
        xhttp.open("GET", "users/" + email, true);
        xhttp.send();
    } else {
        alert("You must be logged in to access this page");
        window.location.href = "/";
    }
}

function loadAllOrders() {
    console.log("loadAllOrders");
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let orders = JSON.parse(this.responseText);
            let ordersAdmin = 0;
            for (let i = 0; i < orders.length; i++) {
                if (orders[i].orderStatus == "PENDING") {
                    ordersAdmin++;
                }
            }
            if (orders == [] || orders.length == 0 || ordersAdmin == 0) {
                ordersContainer.innerHTML = "No hay pedidos de ningun usuario que requieran ser aceptados";
            } else {
                orders.forEach(order => {
                    ordersContainer.innerHTML += orderToHTML(order, true);
                });
            }
        }
    };
    xhttp.open("GET", "admin/orders", true);
    xhttp.setRequestHeader("x-auth", "admin");
    xhttp.send();
}

function loadUserOrders(user) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let orders = JSON.parse(this.responseText);
            console.log(orders);
            if (orders == [] || orders.length == 0) {
                ordersContainer.innerHTML = "No hay pedidos";
            } else {
                orders.forEach(order => {
                    ordersContainer.innerHTML += orderToHTML(order, false);
                });
            }
        }
    };
    xhttp.open("GET", "orders/" + user.UUID, true);
    xhttp.setRequestHeader("x-auth", "admin");
    xhttp.send();
}