if(Meteor.isClient){
    Meteor.startup(function(){
        Hooks.init();
    });
}

Hooks.onLoggedOut = function (userId) {
console.log("Wylogowalo " + userId);
Router.go("/");
}
Hooks.onLoggedIn = function (userId) {
console.log("Zalogowalo " + userId);
}
