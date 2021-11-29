let cartContainer = document.getElementById('cartContainer');
let addButtons = document.getElementsByTagName('add');
for (let i = 0; i < addButtons.length; i++) {
    addButtons[i].addEventListener('click', addtoCart(addButtons[i].getElementsByTagName('UUID')));
}

document.addEventListener("load", updatePage());

function productToHTML(product) {
    return `
    <div class="productContainer">
                    <div class="coffeeImg">
                        <img class="productImg" src="resources/coffeeItems/peetsCoffee.jpg" alt="Peet's Coffee">
                    </div>
                    <div class="coffeeIntormation">
                        <h5 class="productTitle">Peet's Coffee</h5>
                        <div class="inputs">
                            <div class="input-quantity input-group mb-3">
                                <span class="input-group-text">Cantidad:</span>
                                <input type="number" class="quantityInput form-control" min="1" max="5" value="1"
                                    id="quantity" disabled>
                                <button class="pen btn btn-outline-secondary" type="button" for="quantity"
                                    name="quantity" id="button-addon2"><i class="fa fa-pen"
                                        aria-hidden="true"></i></button>
                            </div>
                            <div class="input-price input-group mb-3">
                                <span class="input-group-text">Precio:</span>
                                <input type="text" class="priceInput form-control " value="130.50">
                                <span class="input-group-text">$ m.n.</span>
                            </div>
                            <button class="btn btn-outline-danger d-flex">Eliminar producto</button>
                        </div>
                    </div>
                </div>
    `
}

function addToCart(UUID) {
    console.log(UUID);
}

function updatePage() {

}