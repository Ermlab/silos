Template.header.events = {
    'click #userLogout': function () {
        Meteor.logout();
    },
    'click #signIn': function () {
        Router.go('signin');
    }
};
Template.header.gravatarHash = function () {
    return CryptoJS.MD5(Meteor.user().emails[0].address);
}

Template.header.helpers({
    'userType': function (user) {
        if (user.emails != null) {
            return true;
        } else {
            return false
        }
    }
});