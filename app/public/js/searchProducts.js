var searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", readFilters);
let ordersButton = document.getElementById('barMyOrders');

ordersButton.addEventListener('click', function () {
    window.location.href = '/orders';
});

document.addEventListener("load", updatePage());

function getURLparameters(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

function updatePage() {
    let query = "?";
    let tipoCafe = getURLparameters("tipoCafe");
    let tipoGrano = getURLparameters("tipoGrano");
    let cafeLocal = getURLparameters("cafeLocal");
    if (tipoCafe == null && tipoGrano == null && cafeLocal == null) {
        document.getElementById("productsContainer").hidden = true;
    }
    var tipoCafeForm = document.getElementById("tipoCafe").elements;
    for (i = 0; i < tipoCafeForm.length; i++) {
        if (tipoCafeForm[i].value == tipoCafe) {
            tipoCafeForm[i].checked = true;
        } else {
            tipoCafeForm[i].checked = false;
        }
    }
    var tipoGranoForm = document.getElementById("tipoGrano").elements;
    for (i = 0; i < tipoGranoForm.length; i++) {
        if (tipoGranoForm[i].value == tipoGrano) {
            tipoGranoForm[i].checked = true;
        } else {
            tipoGranoForm[i].checked = false;
        }
    }
    var cafeLocalForm = document.getElementById("cafeLocal").elements;
    for (i = 0; i < cafeLocalForm.length; i++) {
        if (cafeLocalForm[i].value == cafeLocal) {
            cafeLocalForm[i].checked = true;
        } else {
            cafeLocalForm[i].checked = false;
        }
    }

    if (tipoCafe != null) {
        query += "tipoCafe=" + tipoCafe + "&";
    }
    if (tipoGrano != null) {
        query += "tipoGrano=" + tipoGrano + "&";
    }
    if (cafeLocal != null) {
        query += "cafeLocal=" + cafeLocal + "&";
    }
    query = query.substring(0, query.length - 1);
    if (query != "") {
        searchProducts(query);
    }
}

function readFilters() {
    let query = "?"
    var tipoCafeForm = document.getElementById("tipoCafe").elements;
    for (i = 0; i < tipoCafeForm.length; i++) {
        if (tipoCafeForm[i].checked) {
            query += "tipoCafe=" + tipoCafeForm[i].value + "&";
        }
    }
    var tipoGranoForm = document.getElementById("tipoGrano").elements;
    for (i = 0; i < tipoGranoForm.length; i++) {
        if (tipoGranoForm[i].checked) {
            query += "tipoGrano=" + tipoGranoForm[i].value + "&";
        }
    }
    var cafeLocalForm = document.getElementById("cafeLocal").elements;
    for (i = 0; i < cafeLocalForm.length; i++) {
        if (cafeLocalForm[i].checked) {
            query += "cafeLocal=" + cafeLocalForm[i].value + "&";
        }
    }
    query = query.substring(0, query.length - 1);
    window.location.href = "search" + query;
}

function searchProducts(query) {
    // Make a request to /products + query
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Convert the response to JSON
            var products = JSON.parse(this.responseText);
            // If the response is empty, show an error message
            if (products.products.length == 0) {
                console.log("No products found");
                notfoundtoast();
                document.getElementById("productsContainer").hidden = true;
            } else {
                document.getElementById("productsContainer").hidden = false;
                foundtoast();
                // Show the products
                showProducts(products);
            }
        }
    };
    xhttp.open("GET", "products" + query, true);
    xhttp.send();
}

function productToHTML(product) {
    return `
    <div class="productContainer">
                    <div class="coffeeImg">
                        <img class="productImg" src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="coffeeIntormation">
                        <h4>${product.name}</h4>
                        <p class="productText"><b>Tipo de café:</b> ${product.tipoCafe}</p>
                        <p class="productText"><b>Tipo de grano:</b> ${product.tipoGrano}</p>
                        <p class="productText"><b>Origen:</b> ${product.cafeLocal}.</p>
                        <p class="productText"><b>Descripción:</b> ${product.description}</p>
                        <p class="productText"><b>Precio:</b> ${product.pricePerUnit}</p>
                    </div>
                    <div class="buttons col-md-4">
                        <div>
                            <input type="number" class="quantityInput form-control" min="1" max="5" value=1 id="quantity" uuid=${product.UUID} >
                            <button type="button" name="add" class="accept-button btn btn-success" data-dismiss="modal" uuid=${product.UUID} onclick="addToCart('${product.UUID}')">Agregar</button>
                        </div>
                    </div>
                </div>`
}

function showProducts(products) {
    for (let i = 0; i < products.products.length; i++) {
        let product = products.products[i];
        let productHTML = productToHTML(product);
        document.getElementById("productsContainer").innerHTML += productHTML;
    }
}

function addToCart(uuid) {
    toast();
    // Get input above button
    let quantity = 0;
    let quantities = document.getElementsByClassName("quantityInput form-control");
    for (let i = 0; i < quantities.length; i++) {
        if (quantities[i].getAttribute("uuid") == uuid) {
            quantity = quantities[i].value;
            console.log("Quantity: " + quantity);
        }
    }
    console.log("Adding to cart: " + uuid + " quantity: " + quantity);
    let shoppingCart = localStorage.getItem("shoppingCart");
    if (shoppingCart == null || shoppingCart == "") { 
        console.log("Shopping cart is empty");
        shoppingCart = [];
    } else {
        console.log("Shopping cart is not empty");
        shoppingCart = JSON.parse(shoppingCart);
    }
    let product = {
        "UUID": uuid,
        "quantity": quantity
    };
    // Check if product is already in the cart
    console.log("Checking if product is already in the cart");
    console.log(shoppingCart);
    if (shoppingCart == null || shoppingCart == "" || shoppingCart.length == 0) {
        console.log("Shopping cart is empty, pushing product");
        shoppingCart.push(product);
    } else {
        console.log("Shopping cart is not empty, checking if product is already in the cart");
        let found = false;
        for (let i = 0; i < shoppingCart.length; i++) {
            if (shoppingCart[i].UUID == uuid) {
                console.log("Product is already in the cart");
                shoppingCart[i].quantity = parseInt(shoppingCart[i].quantity) + parseInt(quantity);
                found = true;
            }
        }
        if (!found) {
            console.log("Product is not in the cart, pushing product");
            shoppingCart.push(product);
        } else {
            console.log("Product is already in the cart, updating quantity");
        }
    }
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    console.log(shoppingCart);
}

function toast() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function foundtoast() {
    var x = document.getElementById("found");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function notfoundtoast() {
    var x = document.getElementById("notFound");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function uncheckAll() {
    window.location.href = "search";
  }
  
   document.querySelector('button[type="clear"]').addEventListener('click', uncheckAll)