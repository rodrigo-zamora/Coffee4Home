function searchProducts() {
    let tipoCafe = document.getElementById("tipoCafe").value;
    let tipoGrano = document.getElementById("tipoGrano").value;
    let cafeLocal = document.getElementById("cafeLocal").value;
    let query = "?tipoCafe=" + tipoCafe + "&tipoGrano=" + tipoGrano + "&cafeLocal=" + cafeLocal;
    
    console.log(query);

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://coffe4home-development.herokuapp.com/products/' + query, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(producto);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let response = JSON.parse(xhr.responseText);
            let result = "";
            let i = 0;
            while (response[i] != null) {
                result += "<div class='col-md-4'>" +
                    "<div class='card'>" +
                    "<img src='" + response[i].ruta_imagen + "' class='card-img-top' alt='...'>" +
                    "<div class='card-body'>" +
                    "<h5 class='card-title'>" + response[i].nombre + "</h5>" +
                    "<p class='card-text'>" + response[i].descripcion + "</p>" +
                    "<p class='card-text'>" + response[i].precio + "</p>" +
                    "<button onclick='addProduct(" + response[i].id_producto + ")' class='btn btn-primary'>Añadir</button>" +
                    "</div>" +
                    "</div>" +
                    "</div>";
                i++;
            }
            document.getElementById("result").innerHTML = result;
        }
    }
}