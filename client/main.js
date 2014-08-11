Meteor.startup(function () {
    Meteor.subscribe('logBooks');
    Meteor.subscribe("userData");
    //Hooks.init();
});

//FIXME: do czegos to sluzy?
//Hooks.onLoggedOut = function () {}
//Hooks.onLoggedIn = function () {}