Router.configure({
layoutTemplate: 'layout'

});

Router.map(function() {
this.route('showLogBooks', {
    path: '/',
    waitOn: function() {
        Meteor.subscribe('myLogBooks', Meteor.userId());
        Meteor.subscribe('logs');
        var user = Meteor.user();
        var email = user && user.emails && user.emails[0].address;

        console.log(email);
        Meteor.subscribe('friendsLogBooks',1,2 ,email);
    },
    data: function() {
        var user = Meteor.user();
        var email = user && user.emails && user.emails[0].address;

        var la = LogBooks.find({AuthorID: Meteor.userId()}).fetch();

        _.each(la,function(obj){
            obj.isntRead=Logs.find({LogBookID: obj._id,LogDate: {$gt :(new Date(obj.LastVisit[0].date).getTime())}}).count();
        })
        var lb=LogBooks.find({"users" : email}).fetch();
        .each(lb,function(obj){
            obj.isntRead=Logs.find({LogBookID: obj._id,LogDate: {$gt :(new Date(obj.LastVisit[0].date).getTime())}}).count();
        })
        return {
        myLogBooks: la,
        friendsLogBooks: lb
    } }
});
this.route('createLogBook', {
    path: '/CreateLogBook',
    waitOn: function() { Meteor.subscribe("userData"); },
    data: function() {  }

});


this.route('showLogs', {
        path: '/showLogs/:_id/tag/:tag',
        waitOn: function() { return Meteor.subscribe('logs',this.params._id); },
        data: function() { return {
            logs: Logs.find({LogTags: this.params.tag}).fetch(),
            id: this.params._id
        } }
});
    this.route('showLogs', {
        path: '/showLogs/:_id/level/:level',
        waitOn: function() { return Meteor.subscribe('logs',this.params._id); },
        data: function() { return {
            logs: Logs.find({LogSeverity: this.params.level}).fetch(),
            id: this.params._id
        } }
    });
    this.route('showLogs', {
        path: '/showLogs/:_id',
        waitOn: function() { Meteor.subscribe('logs',this.params._id); },
        data: function() {

            return {
            logs: Logs.find({LogBookID:this.params._id}).fetch(),
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
 this.route('manyLogBooks',
    {
        path: "/manyLogBooks"
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
