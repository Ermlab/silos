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

        Meteor.subscribe('friendsLogBooks',1,2 ,email);
    },
    data: function() {
        var user = Meteor.user();
        var email = user && user.emails && user.emails[0].address;

        var la = LogBooks.find({AuthorID: Meteor.userId()}).fetch();
        var lb=LogBooks.find({"users" : email}).fetch();

        _.each(la,function(obj) {


        if (typeof obj.LastVisit[0]=== "undefined") {

            obj.isntRead = Logs.find({LogBookID: obj._id}).count();

            // no variable "v" is defined in the current scop1e
            // *or* some variable v exists and has been assigned the value undefined
        } else {
            obj.isntRead = Logs.find({LogBookID: obj._id, LogDate: {$gt: (new Date(obj.LastVisit[0].date)).getTime()}}).count();

        }




                   //



                //var tmp = Logs.find({LogBookID: obj._id}).count();



        })
        _.each(lb,function(obj) {
            try {
                obj.isntRead = Logs.find({LogBookID: obj._id, LogDate: {$gt: (new Date(obj.LastVisit[0].date).getTime())}}).count();
            } catch (E) {
                obj.isntRead = Logs.find({LogBookID: obj._id}).count();
            }
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
        data: function() {

            return {
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
        waitOn: function() {
            Meteor.subscribe('logs',this.params._id);
            Meteor.subscribe('logBook', this.params._id);
        },

        data: function() {
            return {
                id: this.params._id,
                logs: Logs.find({LogBookID: this.params._id}).fetch(),
                Views: LogBooks.find({_id: this.params._id}).fetch()
            }
        }
    });
this.route('addUser', {
    path: '/addUser/:_id',
        waitOn: function() { return Meteor.subscribe('logBooks', { AuthorID:  Meteor.userId() }); },
        data: function() {

            return{
            myLogBooks: LogBooks.find({_id: this.params._id}).fetch(),
            id: this.params._id }
            }
});

this.route('editLogBook', {
	path: '/editLogBook/:_id',
	waitOn: function() { return Meteor.subscribe('logBooks', 		Meteor.userId()); },
	data: function() {
        var views=LogBooks.findOne({_id: this.params._id}).View;
        return {
        logBooks: LogBooks.find({_id: this.params._id}),
        Views: views,
        id: this.params._id
    }
    }
});

 this.route('showUsers', {
        path: '/showUsers/:id',
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
 this.route('noAccess', { path: "/noAccess" });
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
Router.onBeforeAction(requireLoginCreate, {only: 'addUser'});
Router.onBeforeAction(requireLoginCreate, {only: 'editLogBook'});
Router.onBeforeAction(requireLoginCreate, {only: 'showUsers'});
Router.onBeforeAction(requireLoginShow, {only: 'showLogBooks'});
