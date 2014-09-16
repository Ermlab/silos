Template.signin.rendered = function () {
    Meteor.setTimeout(function () {

        var userGoogleSettings = Accounts.loginServiceConfiguration.find({
            service: 'google'
        }).fetch();

        if (userGoogleSettings != '') {

            var id = Meteor.userId();

            if (id != null) {
                Router.go('/');
            }

            var google = document.getElementById("google");

            if (google) {
                google.setAttribute('class', 'btn btn-success btn-sm');

                document.getElementById("googleText").innerHTML = 'Sign in with Google';
            }
        } else {

            var google = document.getElementById("google");

            google.setAttribute('class', 'btn btn-danger btn-sm'); // Here is the problem, need to remove.

            document.getElementById("googleText").innerHTML = 'Google is not configured';
        }

        var userGithubSettings = Accounts.loginServiceConfiguration.find({
            service: 'github'
        }).fetch();

        if (userGithubSettings != '') {

            var id = Meteor.userId();

            if (id != null) {
                Router.go('/');
            }

            var userGithubSettings = document.getElementById("github");

            if (userGithubSettings) {
                userGithubSettings.setAttribute('class', 'btn btn-success btn-sm');

                document.getElementById("githubText").innerHTML = 'Sign in with Github';
            }

        } else {

            var userGithubSettings = document.getElementById("github");

            userGithubSettings.setAttribute('class', 'btn btn-danger btn-sm');

            document.getElementById("githubText").innerHTML = 'Github is not configured';
        }
    }, 100)
}

Template.signin.events = {
    'click #signin': function () {
        var email = iEmail.value;

        var password = inputPassword.value;

        var ema = document.getElementById("iEmail");
        ema.setAttribute('placeholder', 'Enter email');

        var pass = document.getElementById("inputPassword");
        pass.setAttribute('placeholder', 'Password');

        if (email != "" && password != "") {
            Meteor.loginWithPassword(email, password, function (error) {
                if (error != undefined) {
                    document.getElementById("errors").innerHTML = error.reason;
                } else {

                    iEmail.value = "";

                    inputPassword.value = "";

                    Router.go('/');
                }
            })
        }
    },

    'click #github': function (error) {
        Meteor.loginWithGithub({
            requestPermissions: ['user', 'public_repo']
        }, function (err) {
            if (err) {
                var github = document.getElementById("github");

                var email = document.getElementById("iEmail");
                email.setAttribute('placeholder', 'Client ID');

                var pass = document.getElementById("inputPassword");
                pass.setAttribute('placeholder', 'Client secret');

                if (email.value != "" && pass.value != "") {
                    Meteor.call('insertGithubOptions', 'github', email.value, pass.value);

                    var userGithubSettings = document.getElementById("github");

                    userGithubSettings.setAttribute('class', 'btn btn-success btn-sm');

                    document.getElementById("githubText").innerHTML = 'Sign in with Github';

                    document.getElementById("errors").innerHTML = '';

                    email.value = '';
                    pass.value = '';
                } else {
                    document.getElementById("errors").innerHTML = " Left blank field";
                }
            }
        });
    },

    'click #forgotPassword': function (error) {

        var status = document.getElementById('iEmail').getAttribute('placeholder');

        if (status == 'Enter email') {
            document.getElementById("inputPassword").style.display = "none";

            document.getElementById("github").style.display = "none";

            document.getElementById("google").style.display = "none";

            document.getElementById("signin").style.display = "none";

            document.getElementById("iEmail").setAttribute('placeholder', 'Please enter e-mail for changing password');
        }
        if (status == 'Please enter e-mail for changing password') {

            var email = document.getElementById("iEmail");

            Accounts.forgotPassword({
                email: email.value
            }, function (err) {
                if (err) {
                    if (err.message === 'User not found [403]') {
                        document.getElementById("errors").innerHTML = 'This email does not exist.';
                    } else {
                        document.getElementById("errors").innerHTML = 'We are sorry but something went wrong.';
                    }
                } else {
                    document.getElementById("errors").innerHTML = 'Email Sent. Check your mailbox.';
                }
            });
        }
    },

    'click #google': function (error) {
        Meteor.loginWithGoogle({}, function (err) {
            if (err) {
                var github = document.getElementById("google");

                var email = document.getElementById("iEmail");
                email.setAttribute('placeholder', 'Client ID');

                var pass = document.getElementById("inputPassword");
                pass.setAttribute('placeholder', 'Client secret');

                if (email.value != "" && pass.value != "") {
                    Meteor.call('insertGoogleOptions', 'google', email.value, pass.value);

                    var userGithubSettings = document.getElementById("google");

                    userGithubSettings.setAttribute('class', 'btn btn-success btn-sm');

                    document.getElementById("googleText").innerHTML = 'Sign in with Google';

                    document.getElementById("errors").innerHTML = '';

                    email.value = '';
                    pass.value = '';
                } else {
                    document.getElementById("errors").innerHTML = " Left blank field";
                }
            }
        });
    }
};

//Template.ForgotPassword.events({
//    'submit #forgotPasswordForm': function () {
//
//        
//        return false;
//    },
//});