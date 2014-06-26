Router.configure({
layoutTemplate: 'layout',
waitOn: function() { return Meteor.subscribe('logBooks'); }
});
Router.map(function() {
this.route('startPage', {path: '/'});
this.route('showLogBooks', {path: '/showLogBooks'});
this.route('createLogBook', {path: '/CreateLogBook'});
    this.route('methodExample', {
        path: '/api/call/:_key',
        where: 'server',
	 //data: function() { return LogBooks.find().toArray; },
        action: function() {
            // GET, POST, PUT, DELETE
            var requestMethod = this.request.method;
            // Data from a POST request
           if (LogBooks.find(this.params._key).count()>0)
           {
               var LogName = this.request.body.logName;
               var LogBody= this.request.body.logBody;
               var LogDate= (new Date).getTime();
               Logs.insert({
                   LogName: LogName,
                   LogBookID: this.params._key,
                   LogBody: LogBody,
                   LogDate: LogDate
               });
               console.log("przyslano loga");
           }else{
           }
            this.response.writeHead(200, {'Content-Type': 'text/html'});
            this.response.end('<html><body>Your request was a ' + requestMethod + '</body></html>');
        }
    });
});

var requireLogin = function(pause){
 if (! Meteor.user()) {
	this.render('accessDenied');
	pause();
	}
 }

Router.onBeforeAction(requireLogin, {only: 'createLogBooks'});


