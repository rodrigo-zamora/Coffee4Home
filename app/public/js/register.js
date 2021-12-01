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

function validatePassword(){
    if(password1.value != password2.value) {
        password2.setCustomValidity("Passwords Don't Match");
    } else {
        password2.setCustomValidity('');
    }
}
password1.onchange = validatePassword;
password2.onkeyup = validatePassword;

function validateZip(){
    if(zip.value.length != 5) {
        zip.setCustomValidity("Zip code must be 5 digits");
    } else {
        zip.setCustomValidity('');
    }
}
zip.onchange = validatePassword;
zip.onkeyup = validatePassword;

function sendSignUp() {
    if (firstname.value == "" || lastname.value == "" || email.value == "" || password1.value == "" || password2.value == "" || phone.value == "" || street.value == "" || city.value == "" || state.value == "" || zip.value == "") {
        alert("Please fill out all fields");
    }
    else {
        if(password1.value != password2.value) {
            alert("Passwords don't match");
        }
        else if(zip.value.length != 5) {
            alert("Zip code must be 5 digits");
        }
        else if (email.value.indexOf("@") == -1 || email.value.indexOf(".") == -1) {
            alert("Please enter a valid email");
        }
        else if (phone.value.length != 10) {
            alert("Please enter a valid phone number");
        }
        else if (isNaN(phone.value)) {
            alert("Please enter a valid phone number");
        }
        else if (password1.value.length < 8) {
            alert("Password must be at least 8 characters");
        }
        else if (String(password1.value).match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/) == false) {
            alert("Password must contain at least one number, one lowercase and one uppercase letter");
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
            alert("Wrong email or password");
        }
    };
    xhr.send(JSON.stringify(data));
}

