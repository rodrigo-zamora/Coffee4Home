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
    console.log("sendSignUp");
    var firstName_u = firstname.value;
    var lastName_u = lastname.value;
    var email_u = email.value;
    var password_u = password1.value;
    var phone_u = phone.value;
    var street_u = street.value;
    var city_u = city.value;
    var state_u = state.value;
    var zip_u = zip.value;
    var newUser = {
        "firstName": firstName_u,
        "lastName": lastName_u,
        "email": email_u,
        "password": password_u,
        "street": street_u,
        "city": city_u,
        "state": state_u,
        "zip": zip_u,
        "phone": phone_u,
        "role": "USER"
    };
    var newUser2 = {
        firstName: firstName_u,
        lastName: lastName_u,
        email: email_u,
        password: password_u,
        street: street_u,
        city: city_u,
        state: state_u,
        zip: zip_u,
        phone: phone_u,
        role: "USER"
    };
    console.log(newUser);
    console.log(newUser2);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/admin/users", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("x-auth", "admin");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                //window.location.href = "/?";
                console.log(xhr.responseText);
                console.log(newUser);
                console.log(newUser2);
            } else {
                alert("Error: " + xhr.status);
            }
        }
    }
    //xhr.send(JSON.stringify(newUser));
}

