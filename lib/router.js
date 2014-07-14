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
            Meteor.call('updateTime',this.params._id);
        },
        data: function() {
            var hash = window.location.hash.substring(1).split("&");

            var json=[];
            var jsonVariable={};
            jsonVariable['LogBookID']=this.params._id;
            if (hash[0]>0){
                jsonVariable['LogSeverity'] = hash[0];
            }
            if (hash.length>1){
                var search=hash[1].toString().split("=");
                if (search[0]!="" && search[1]!="")
                {
                    jsonVariable[search[0]]=search[1];
                }
                console.log("searching: ", jsonVariable);
            }
            var findLogs=Logs.find(jsonVariable).fetch();
            var fields=LogBooks.findOne({_id: this.params._id}).View;
            var table=[];
            findLogs.forEach(function makeTable(entity) {
                var row=[];
                fields.forEach(function f(field) {
                    if (field.visible) {
                        switch(field.field){
                            case "LogSeverity":{
                                switch(entity[field.field]){
                                    case "1": row.push({field: "debug"}); break;
                                    case "2": row.push({field: "info"}); break;
                                    case "3": row.push({field: "warrning"}); break;
                                    case "4": row.push({field: "error"}); break;
                                    case "5": row.push({field: "fatal"}); break;
                                    default : row.push({field: "undefined"});  break;
                                }
                            } break;
                            case "LogDate":{
                                row.push({field: (new Date(entity[field.field])).toDateString()});
                            } break;
                            default:{
                                row.push({field: entity[field.field]});
                            }
                        }

                    }
                });
                table.push({row: row});
            });
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
