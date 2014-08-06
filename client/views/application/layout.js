Template.layout.rendered = function(){
    $("#main").css("margin-top",d3.select('#navbar').style('height'));
};
Template.layout.helpers({
    isUser: function () {
        return Meteor.userId();
    },
    isntUser: function (){
        return !Meteor.userId();
    }

})