if(Meteor.isClient){
    Meteor.startup(function(){
        Hooks.init();
    });
}

Hooks.onLoggedOut = function () {
console.log("Wylogowalo ");
Router.go("/");
}
Hooks.onLoggedIn = function () {
console.log("Zalogowalo ");
}
