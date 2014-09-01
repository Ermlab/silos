Meteor.startup(function () {
    Meteor.subscribe('logBooks');
    Meteor.subscribe("userData");
});