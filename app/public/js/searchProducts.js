var searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", searchProducts);

function searchProducts() {
    console.log("searchProducts");
    let tipoCafe = "";
    let tipoGrano = "";
    let cafeLocal = "";

    var tipoCafeForm = document.getElementById("tipoCafe").elements;
    for (i = 0; i < tipoCafeForm.length; i++) {
        if (tipoCafeForm[i].checked) {
            tipoCafe = tipoCafeForm[i].value;
        }
    }

    var tipoGranoForm = document.getElementById("tipoGrano").elements;
    for (i = 0; i < tipoGranoForm.length; i++) {
        if (tipoGranoForm[i].checked) {
            tipoGrano = tipoGranoForm[i].value;
        }
    }

    var cafeLocalForm = document.getElementById("cafeLocal").elements;
    for (i = 0; i < cafeLocalForm.length; i++) {
        if (cafeLocalForm[i].checked) {
            cafeLocal = cafeLocalForm[i].value;
        }
    }
    
    let query = "?tipoCafe=" + tipoCafe + "&tipoGrano=" + tipoGrano + "&cafeLocal=" + cafeLocal;
    
    console.log(query);

    // Send query to the server
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/products" + query, true);
    xhr.onreadystatechange = function () {
        
    }
}