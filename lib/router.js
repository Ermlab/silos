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
           var doc=LogBooks.findOne({Key:this.params._key});
	if (doc)
           {
	
               var LogName = this.request.body.logName;
               var LogBody= this.request.body.logBody;
	       var LogSeverity= this.request.body.logSeverity; 
	       var LogThread= this.request.body.logThread;
               var LogDate= (new Date).getTime();
               Logs.insert({
                   LogName: LogName,
                   LogBookID: doc._id,
                   LogBody: LogBody,
                   LogDate: LogDate,
		   LogSeverity: LogSeverity,
		   LogThread: LogThread
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


