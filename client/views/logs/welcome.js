Template.welcome.events = {

    'click #register': function () {
        var email = iEmail.value;
        var password = inputPassword.value;
        var passwordConfirm = inputPasswordConfirm.value;

        if (errors()) {
            document.getElementById("errors").innerHTML = "";

            Accounts.createUser({
                email: email,
                username: email,
                password: password
            });

            iEmail.value = "";

            inputPassword.value = "";

            inputPasswordConfirm.value = "";

        } else {

            document.getElementById("errors").innerHTML = "Passwords do not match. Please Try again";
        }
    }
};

function errors() {
    var password = inputPassword.value;

    var passwordConfirm = inputPasswordConfirm.value;

    if (password == passwordConfirm) {
        return true
    }
    return false
}