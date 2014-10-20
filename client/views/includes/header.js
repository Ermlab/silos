Template.header.helpers({
    gravatarHash: function () {
        return CryptoJS.MD5(Meteor.user().emails[0].address);
    },
    userType: function (user) {
        if (user.emails != null) {
            return true;
        } else {
            return false
        }
    }
});

Template.header.events = {
    'click #userLogout': function () {
        Meteor.logout();
    },
    'click #signIn': function () {
        Router.go('signin');
    }
};