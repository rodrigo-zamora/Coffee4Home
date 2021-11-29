var searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", searchProducts);

function searchProducts() {
    console.log("searchProducts");
    

    let tipoGrano = document.getElementById("tipoGrano").value;
    let cafeLocal = document.getElementById("cafeLocal").value;
    let query = "?tipoCafe=" + tipoCafe + "&tipoGrano=" + tipoGrano + "&cafeLocal=" + cafeLocal;
    
    console.log(query);

}