"use strict";

var loginButton = document.getElementById("loginButton");
var barLogin = document.getElementById("barLogin");
var barRegister = document.getElementById("barRegister");
var barSignOut = document.getElementById("barSignOut");
var barMyOrders = document.getElementById("barMyOrders");
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
            var response = xhr.responseText;
            //window.location.href = "/"+email;
            //window.location.href = "/";
            barLogin.hidden = true;
            barRegister.hidden = true;
            barSignOut.hidden = false;
            barMyOrders.hidden = false;
            console.log("Response: " + response);
            //console.log("user:" + user);
        }
        else if (xhr.readyState === 4 && xhr.status !== 200) {
            alert("Wrong email or password");
        }
    };
    console.log(data);
    xhr.send(JSON.stringify(data));
}
