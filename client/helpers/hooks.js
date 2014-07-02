if(Meteor.isClient){
    Meteor.subscribe("userData");
    Meteor.startup(function(){
        Hooks.init();
    });
}

Hooks.onLoggedOut = function () {
console.log("Wylogowalo ");
}
Hooks.onLoggedIn = function () {
console.log("Zalogowalo ");
}


