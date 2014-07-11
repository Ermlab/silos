function createTable(ID,adres) {
    function getSearch(Hash) {
        var search = Hash.toString().substring(2);
        if (Hash.length > 1) {

            return search.split("=");
        } else {
            return [ ];
        }
    };
    function getLevel(Hash) {
        console.log(Hash[0]);
        if (Hash.length > 0) {
            return Hash[0];
        } else {
            return 0;
        }
    };
    var table=[];
    console.log("createTable");
    console.log(Logs.find().fetch());
    return table;
}
Router.configure({
layoutTemplate: 'layout'
});
Router.map(function() {

     this.route('wellcome', {
     path: '/',
     waitOn: function() {

     },

     data: function()
     {
     }
     });



    function dataLeftPanel(user) {

    }

    function waitLeftPanel() {
        Meteor.subscribe("userData");
        Meteor.subscribe('myLogBooks', Meteor.userId());
        Meteor.subscribe('logs');
    }

    this.route('logBookInfo', {
        path: '/logBookInfo/:_id',
        waitOn: function () {
            Meteor.subscribe('logBooks', {_id: this.params._id});
            waitLeftPanel();
        },
        data: function () {
            var author = LogBooks.findOne({_id: this.params._id}).Author;
            var key = LogBooks.findOne({_id: this.params._id}).Key;
            var crt = LogBooks.findOne({_id: this.params._id}).Created;
            var nm = LogBooks.findOne({_id: this.params._id}).Name;
            return {
                Name: nm,
                Created: crt,
                Key: key,
                Author: author,
                id: this.params._id
                }
        }



    });

    this.route('showLogs', {
        path: '/showLogs/:_id',
        waitOn: function() {
            Meteor.subscribe('logs',this.params._id);
            Meteor.subscribe('logBook', this.params._id);
        },
        data: function() {
            var findLogs=Logs.find({LogBookID: this.params._id}).fetch();
            console.log(findLogs);
            var fields=LogBooks.findOne({_id: this.params._id}).View;
            console.log(fields);

            var table=[];
            table.push({ pole: "<thead></thead>"});
            //here thead

            table.push({ pole: "</thead><tbody>"});
            findLogs.forEach(function makeTable(entity) {
                var row = entity["LogMsg"];
                fields.forEach(function f(field) {
                    if (field.visible) {
                        row +=entity[field.field].toString();
                    }

                    table.push({ pole: row});
                });
            });
            table.push({ pole: "</tbody>"});
            console.log(table);
            return {
                id: this.params._id,
                logs: Logs.find({LogBookID: this.params._id}).fetch(),
                Views: LogBooks.find({_id: this.params._id}).fetch(),
                Rows: table
            }
        }
    });
    this.route('addUser', {
        path: '/addUser/:_id',
        waitOn: function () {
            return Meteor.subscribe('logBooks', { AuthorID: Meteor.userId() });
        },
        data: function () {

            return{
                myLogBooks: LogBooks.find({_id: this.params._id}).fetch(),
                id: this.params._id }
        }
    });

    this.route('editLogBook', {
        path: '/editLogBook/:_id',
        waitOn: function () {
            return Meteor.subscribe('logBooks', Meteor.userId());
        },
        data: function () {
            var views = LogBooks.findOne({_id: this.params._id}).View;
            var key= LogBooks.findOne({_id: this.params._id}).Key;
            return {
                logBooks: LogBooks.findOne({_id: this.params._id}),
                Views: views,
                Key: key,
                id: this.params._id
            }
        }
    });

    this.route('showUsers', {
        path: '/showUsers/:_id',
        waitOn: function () {
            return Meteor.subscribe('logBookUsers', true, this.params._id);
        },
        data: function () {
            return {
                logBookUsers: LogBooks.find({_id: this.params._id}).fetch(),

                id: this.params._id
            }
        }
    });
    this.route('manyLogBooks',
        {
            path: "/manyLogBooks"
        });
    this.route('noAccess', {
        path: "/noAccess"
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
Router.onBeforeAction(requireLoginCreate, {only: 'addUser'});
Router.onBeforeAction(requireLoginCreate, {only: 'editLogBook'});
Router.onBeforeAction(requireLoginCreate, {only: 'showUsers'});
Router.onBeforeAction(requireLoginShow, {only: 'showLogBooks'});
