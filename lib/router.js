Router.configure({
layoutTemplate: 'layout'

});

Router.map(function() {
this.route('showLogBooks', {
    path: '/',
    waitOn: function() { return Meteor.subscribe('logBooks',{AuthorID : Meteor.userId()}); },
    data: function() { return {logBooks: LogBooks.find().fetch()} }
});
this.route('createLogBook', {path: '/CreateLogBook'});
    
});

var requireLogin = function(pause){
 if (! Meteor.user()) {
	this.render('accessDenied');
	pause();
	}
 }

Router.onBeforeAction(requireLogin, {only: 'createLogBooks'});
Router.onBeforeAction(requireLogin, {only: 'showLogBooks'});


