"use strict";

var loginButton = document.getElementById("loginButton");
var barLogin = document.getElementById("barLogin");
var barRegister = document.getElementById("barRegister");
var barSignOut = document.getElementById("barSignOut");
var barMyOrders = document.getElementById("barMyOrders");
loginButton.addEventListener("click", sendLogin);
document.addEventListener("load", checkLogin());

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
            var response = xhr.responseText;
            localStorage.setItem("token", response);
            localStorage.setItem("email", email);
            checkLogin();
        }
        else if (xhr.readyState === 4 && xhr.status !== 200) {
            alert("Wrong email or password");
        }
    };
    xhr.send(JSON.stringify(data));
}

function checkLogin() {
    var token = localStorage.getItem("token");
    if (token) {
        barLogin.hidden = true;
        barRegister.hidden = true;
        barSignOut.hidden = false;
        barMyOrders.hidden = false;
    }
    else {
        barLogin.hidden = false;
        barRegister.hidden = false;
        barSignOut.hidden = true;
        barMyOrders.hidden = true;
    }
}
