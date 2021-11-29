var searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", readFilters);

document.addEventListener("load", updatePage());

function getURLparameters(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}

function updatePage() {
    console.log("updatePage()");
    let query = "?";
    let tipoCafe = getURLparameters("tipoCafe");
    let tipoGrano = getURLparameters("tipoGrano");
    let cafeLocal = getURLparameters("cafeLocal");
    if  (tipoCafe == null && tipoGrano == null && cafeLocal == null) {
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
    searchProducts(query);    
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
    console.log("searchProducts(query): " + query);
    // Make a request to /products + query
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Convert the response to JSON
            var products = JSON.parse(this.responseText);
            // If the response is empty, show an error message
            if (products.length == undefined || products.length == 0) {
                console.log("No products found");
                document.getElementById("productsContainer").hidden = true;
                //document.getElementById("noProducts").hidden = false;
            } else {
                //document.getElementById("noProducts").hidden = true;
                document.getElementById("productsContainer").hidden = false;
                // Show the products
                showProducts(products);
            }
        }
    };
    xhttp.open("GET", "products" + query, true);
    xhttp.send();
}