'use_strict'
var rules = {
    username: {
        minLength: 5
    },
    email: {
        minLength: 5
    }
}

var handleUsernameValidationInput = function (e) {
    var username = e.target.value;
    if (username.length < rules.username.minLength) {
        $(this).addClass("is-invalid");
    } else {
        $(this).removeClass("is-invalid");
    }
}

var handleEmailValidationInput = function (e) {
    var email = e.target.value;
    if (email.length < rules.email.minLength) {
        $(this).addClass("is-invalid");
    } else {
        $(this).removeClass("is-invalid");
    }
}

$(document).ready(function () {
    $('#username').on("input", handleUsernameValidationInput);
    $('#email').on("input", handleEmailValidationInput);
    console.log("rEADY");
});