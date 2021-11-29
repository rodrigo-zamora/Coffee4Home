"use strict";

var loginButton = document.getElementById("loginButton");
loginButton.addEventListener("click", sendLogin);

function sendLogin() {
    var email = document.getElementById("loginMail").value;
    var password = document.getElementById("loginPassword").value;
    var data = {
        email: email,
        password: password
    };
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/login", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = xhr.responseText;
            if (json.success) {
                window.location.href = "/";
            } else {
                alert("Login failed");
            }
        }
    }
    xhr.send(JSON.stringify(data));
}

/* let query = "?";
var email = document.getElementById("loginMail");
query = email.value;
query = query.substring(0, query.length - 1);
window.location.href = "search" + query; */