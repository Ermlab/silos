Router.map(function() { 
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
               var json = [];
               var jsonVariable = {};
               for (var k in this.request.body) {
                   if (this.request.body.hasOwnProperty(k)) {
                       console.log(k);
                       jsonVariable[k] = this.request.body[k];
                       json.push(jsonVariable);
                   }
               }
               jsonVariable['LogDate']= doc._id;
               jsonVariable['LogDate'] = (new Date()).getTime();
               json.push(jsonVariable);
                console.log(json[0]);

              Logs.insert(json[0]);

            this.response.writeHead(200, {'Content-Type': 'text/html'});
            this.response.end('Success');

           }else{
            this.response.writeHead(200, {'Content-Type': 'text/html'});
            this.response.end('Failed');
           }
            
        }
    });
});
