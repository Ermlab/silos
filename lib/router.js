Router.configure({
layoutTemplate: 'layout'

});

Router.map(function() {
this.route('showLogBooks', {
    path: '/',
    waitOn: function() {
        Meteor.subscribe('myLogBooks', Meteor.userId());
        var user = Meteor.user();
        var email = user && user.emails && user.emails[0].address

        console.log(email);
        Meteor.subscribe('friendsLogBooks',1,2 ,email);
    },
    data: function() {
        var user = Meteor.user();
        var email = user && user.emails && user.emails[0].address
        return {
        myLogBooks: LogBooks.find({AuthorID: Meteor.userId()}).fetch(),
        friendsLogBooks: LogBooks.find({"users" : email}).fetch()
    } }
});
this.route('createLogBook', {
    path: '/CreateLogBook',
    waitOn: function() { return Meteor.subscribe('limits', Meteor.userId()); },
    data: function() { return {limits: Limits.find().fetch()} }
});

this.route('showLogs', {
    path: '/showLogs/:_id',
      waitOn: function() { return Meteor.subscribe('logs',this.params._id); },
      data: function() { return {
          logs: Logs.find().fetch(),
          id: this.params._id
      } }
    });
this.route('showLogs', {
        path: '/showLogs/:_id/tag/:tag',
        waitOn: function() { return Meteor.subscribe('logs',this.params._id); },
        data: function() { return {
            logs: Logs.find({LogTags: this.params.tag}).fetch(),
            id: this.params._id
        } }
});
this.route('addUser', {
    path: '/addUser/:_id',
        //waitOn: function() { return Meteor.subscribe('logBooks', { AuthorID:  Meteor.userId() }); },
        data: function() {

            return{
            myLogBooks: LogBooks.find({_id: this.params._id}).fetch(),
            id: this.params._id }
            }
});

this.route('editLogBook', {
	path: '/editLogBook/:_id',
	waitOn: function() { return Meteor.subscribe('logBooks', 		Meteor.userId()); },
	data: function() { return LogBooks.findOne(this.params._id); }
});

 this.route('showUsers', {
        path: '/showUsers/:_id',
        waitOn: function() { return Meteor.subscribe('logBookUsers', true,this.params._id); },
        data: function() {
            return {
            logBookUsers: LogBooks.find({_id: this.params._id}).fetch(),

            id: this.params._id
        } }
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

/*pozniej
function requireAuthor(pause){
    console.log(this.params._id)
    tutaj jeszcze przerobki
}
/
Router.onBeforeAction(requireAuthor, {only: 'addUser'});*/
Router.onBeforeAction(requireLoginCreate, {only: 'createLogBook'});
Router.onBeforeAction(requireLoginShow, {only: 'showLogBooks'});
