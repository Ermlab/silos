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
            console.log(this.request);
	       if (doc)
           {

               var json = [];
               var jsonVariable = {};
               for (var k in this.request.body) {
                   if (this.request.body.hasOwnProperty(k)) {

                       if (k!="LogMsg") {
                           jsonVariable[k] = this.request.body[k];
                          // json.push(jsonVariable);
                       }else{
                           continue;
                       }
                       //json.push(jsonVariable);
                   }
               }
               try {
                   var parsedJson = JSON.parse(this.request.body['LogMsg']);

                   for(var key in parsedJson )
                   {
                       jsonVariable[key]= parsedJson[key];
                       //json.push(jsonVariable);
                   }
                   // json.push(parsedJson);
                   //  console.log(parsedJson);
               }catch(e) {
                   console.log(e);
                   jsonVariable['LogMsg'] = this.request.body['LogMsg'];
                   //json.push(jsonVariable);
               }
               jsonVariable['LogBookID']= doc._id;
               jsonVariable['LogDate'] = (new Date()).getTime();
               json.push(jsonVariable);
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
