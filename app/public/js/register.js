"use strict";

var registerButton = document.getElementById("registerButton");
var firstname = document.getElementById("firstname");
var lastname = document.getElementById("lastname");
var email = document.getElementById("email");
var password1 = document.getElementById("password1");
var password2 = document.getElementById("password2");
var phone = document.getElementById("phone");
var street = document.getElementById("street");
var city = document.getElementById("city");
var state = document.getElementById("state");
var zip = document.getElementById("zip");
registerButton.addEventListener("click", sendSignUp);

function sendSignUp() {
    if (firstname.value == "" || lastname.value == "" || email.value == "" || password1.value == "" || password2.value == "" || phone.value == "" || street.value == "" || city.value == "" || state.value == "" || zip.value == "") {
        filltoast();
        // alert("Please fill out all fields");
    }
    else {
        if(password1.value != password2.value) {
            passmatchtoast();
            // alert("Passwords don't match");
        }
        else if(zip.value.length != 5) {
            ziptoast();
            // alert("Zip code must be 5 digits");
        }
        else if (email.value.indexOf("@") == -1 || email.value.indexOf(".") == -1) {
            emailtoast();
            // alert("Please enter a valid email");
        }
        else if (phone.value.length != 10) {
            phonetoast();
            // alert("Please enter a valid phone number");
        }
        else if (isNaN(phone.value)) {
            phonetoast();
            // alert("Please enter a valid phone number");
        }
        else if (password1.value.length < 8) {
            passmaxtoast();
            // alert("Password must be at least 8 characters");
        }
        else if (String(password1.value).match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/) == false) {
            passpatterntoast();
            // alert("Password must contain at least one number, one lowercase and one uppercase letter");
        }
        else{
            var newUser = {
                firstName: firstname.value,
                lastName: lastname.value,
                email: email.value,
                password: password1.value,
                street: street.value,
                city: city.value,
                state: state.value,
                zip: zip.value,
                phone: phone.value,
                role: "USER"
            };
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/admin/users", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("x-auth", "admin");
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        console.log(xhr.responseText);
                        console.log(newUser);
                        loginFromRegister(newUser.email, newUser.password);
                    } else {
                        alert("Error: " + xhr.status);
                    }
                }
            }
            xhr.send(JSON.stringify(newUser));
        }
    }
}

function loginFromRegister(email, password) {
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
            // alert("Wrong email or password");
            wrongEPtoast();
        }
    };
    xhr.send(JSON.stringify(data));
}

function wrongEPtoast() {
    var x = document.getElementById("wrongEP");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
function filltoast() {
    var x = document.getElementById("fillR");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
function passmatchtoast() {
    var x = document.getElementById("passMatchR");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
function passmaxtoast() {
    var x = document.getElementById("passMaxR");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
function passpatterntoast() {
    var x = document.getElementById("passPatternR");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
function ziptoast() {
    var x = document.getElementById("zipR");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
function emailtoast() {
    var x = document.getElementById("emailR");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
function phonetoast() {
    var x = document.getElementById("phoneR");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}