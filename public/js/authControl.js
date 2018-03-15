'use_strict'
var rules = {
    username: {
        minLength: 5,
        maxLength: 50
    },
    email: {
        minLength: 5,
        maxLength: 100
    },
    password: {
        minLength: 6,
        maxLength: 25
    },
    rePassword: {
        minLength: 6,
        maxLength: 25
    }
}
var controlInputLength = function(value,selector,minLength,maxLength){
    if(value.length < minLength || value.length > maxLength){
        $(selector).addClass("is-invalid");
        return false;
    }
    $(selector).removeClass("is-invalid");
    $(selector).addClass("is-valid")
    return true;
}

var handleUsernameValidationInput = function (e) {
    var username = e.target.value;
    controlInputLength(username,this,rules.username.minLength,rules.username.maxLength);
}

var handleEmailValidationInput = function (e) {
    var email = e.target.value;
    controlInputLength(email,this,rules.email.minLength,rules.email.maxLength);
}

var handlePasswordValidationInput = function (e) {
    var password = e.target.value;
    controlInputLength(password,this,rules.password.minLength,rules.password.maxLength);
}

var handleRePasswordValidationInput = function (e) {
    var rePassword = e.target.value;
    controlInputLength(rePassword,this,rules.rePassword.minLength,rules.rePassword.maxLength);
}

$(document).ready(function () {
    $('#username').on("input", handleUsernameValidationInput);
    $('#email').on("input", handleEmailValidationInput);
    $('#password').on("input", handlePasswordValidationInput);
    $('#repassword').on("input", handleRePasswordValidationInput);

    console.log("rEADY");
});