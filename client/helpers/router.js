Router.configure({
layoutTemplate: 'layout'
});
Router.map(function() {
this.route('stronaGlowna', {path: '/'});
this.route('createLogBook', {path: '/CreateLogBook'});
});


var requireLogin = function(pause){
 if (! Meteor.user()) {
	this.render('accessDenied');
	pause();
	}
 }

Router.before(requireLogin, {only: 'createLogBook'});
