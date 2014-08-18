Meteor.startup(function () {
    // TODO: Deps autorun on user
    Meteor.subscribe('logBooks');
    //Meteor.subscribe("userData");
});