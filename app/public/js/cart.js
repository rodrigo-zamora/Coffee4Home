let cartContainer = document.getElementById('cartContainer');
let productsContainer = document.getElementById('productsContainer');
let addButtons = document.getElementsByTagName('add');
for (let i = 0; i < addButtons.length; i++) {
    addButtons[i].addEventListener('click', addtoCart(addButtons[i].getElementsByTagName('UUID')));
}

document.addEventListener("load", updatePage());

function productToHTML(product) {
    return `
    <div class="productContainer">
                    <div class="coffeeImg">
                        <img class="productImg" src=${product.product.image} alt="Peet's Coffee">
                    </div>
                    <div class="coffeeIntormation">
                        <h5 class="productTitle">${product.product.name}</h5>
                        <div class="inputs">
                            <div class="input-quantity input-group mb-3">
                                <span class="input-group-text">Cantidad:</span>
                                <input type="number" class="quantityInput form-control" min="1" max="5" value="${product.product.quantity}"
                                    id="quantity" disabled>
                            </div>
                            <div class="input-price input-group mb-3">
                                <span class="input-group-text">Precio:</span>
                                <input type="text" class="priceInput form-control " value="${product.product.pricePerUnit}">
                                <span class="input-group-text">$ m.n.</span>
                            </div>
                            <button class="btn btn-outline-danger d-flex" uuid=${product.product.UUID} onclick="removeFromCart('${product.product.UUID}')">Eliminar producto</button>
                        </div>
                    </div>
                </div>
    `
}

function productToCart(product) {
    return `<div class="infoProduct">
                                <p class="coffeeTitle"><i>${product.product.name}</i></p>
                                <div class="totalProduct">
                                    <p class="quantityText card-text">${product.product.quantity}</p>
                                    <p class="priceText card-text">$${product.product.quantity * product.product.pricePerUnit}</p>
                                </div>
                            </div>
    `
}

function updatePage() {
    let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
    let products = [];
    if (shoppingCart != [] && shoppingCart != null) {
        let total = 60;
        document.getElementById('emptyCart').hidden = true;
        document.getElementById('shoppingCartContainer').hidden = false;
        document.getElementById('cartTitle').hidden = false;
        // Make a petition to the server to get get each product for each item in the shopping cart
        // and then add it to the page
        for (let i = 0; i < shoppingCart.length; i++) {
            // Make a request to /products + uuid
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    // Convert the response to JSON
                    var product = JSON.parse(this.responseText);
                    // If the response is empty, show an error message
                    product.product.quantity = shoppingCart[i].quantity;
                    products.push(product);
                }
            }
            xhttp.open("GET", "products/" + shoppingCart[i].UUID, false);
            xhttp.send();
        };
        let productsHTML = '';
        for (let i = 0; i < Object.keys(products).length; i++) {
            productsHTML += productToHTML(products[i]);
            total += products[i].product.quantity * products[i].product.pricePerUnit;
        }
        cartContainer.innerHTML = productsHTML;
        let cartHTML = `
            <h5 class="card-title">Total de Compra</h6>
            <div class="divider"></div>
            `;
        for (let i = 0; i < Object.keys(products).length; i++) {
            cartHTML += productToCart(products[i]);
        }
        total.toFixed(2);
        cartHTML += `
            <div class="infoProduct">
            <p class="coffeeTitle"><i>Costo de envío</i></p>
            <div class="totalProduct">
                <p class="quantityText card-text"></p>
                <p class="priceText card-text">$60.00</p>
            </div>
        </div>
        <div class="divider"></div>
        <div class="infoProduct">
            <p class="coffeeTitle"><i>Monto a pagar:</i></p>
            <div class="totalProduct">
                <p class="quantityText card-text"></p>
                <p class="priceText card-text">$${total}</p><br>
            </div>
        </div>
        `
        productsContainer.innerHTML = cartHTML;
    } else {
        document.getElementById('emptyCart').hidden = false;
        document.getElementById('shoppingCartContainer').hidden = true;
        document.getElementById('cartTitle').hidden = true;
    }
}

function removeFromCart(UUID) {
    let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
    let index = shoppingCart.findIndex(product => product.UUID === UUID);
    shoppingCart.splice(index, 1);
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
    if (shoppingCart.length == 0) {
        localStorage.clear();
    }
    updatePage();
}