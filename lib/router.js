Router.configure({
layoutTemplate: 'layout'

});

Router.map(function() {
this.route('showLogBooks', {
    path: '/',
    waitOn: function() { return Meteor.subscribe('logBooks', Meteor.userId()); },
    data: function() { return {logBooks: LogBooks.find().fetch()} }
});
this.route('createLogBook', {
    path: '/CreateLogBook',
    waitOn: function() { return Meteor.subscribe('limits', Meteor.userId()); },
    data: function() { return {limits: Limits.find().fetch()} }
});

this.route('showLogs', {
    path: '/showLogs/:_id',
      waitOn: function() { return Meteor.subscribe('logs',this.params._id); },
      data: function() { return {logs: Logs.find().fetch()} }
    });
this.route('editLogBook', {
	path: '/editLogBook/:_id',
	waitOn: function() { return Meteor.subscribe('logBooks', 		Meteor.userId()); },
	data: function() { return LogBooks.findOne(this.params._id); }
});

});

function requireLoginCreate(pause){
 if (! Meteor.user()) {
	this.render('accessDenied');
	pause();
	}
 }
function requireLoginShow(pause){
    if (! Meteor.user()) {
        this.render('startPage');
        pause();
    }
}


Router.onBeforeAction(requireLoginCreate, {only: 'createLogBook'});
Router.onBeforeAction(requireLoginShow, {only: 'showLogBooks'});
