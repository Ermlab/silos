Meteor.methods({
	clearLogBook: function (LogBookId) {
	console.log('removing', LogBookId);
	if (!this.isSimulation)
	{
		Logs.remove({LogBookID: LogBookId});
	}
	},
    updateTime: function (LogBookId) {
        if (Meteor.isServer) {
        if (!this.isSimulation) {
            //console.log(LogBookId);
            var Logbooks=LogBooks.findOne({_id: LogBookId});
            //console.log(Logbooks);
            var visited=false;
            Logbooks.LastVisit.forEach(function (obj)
            {
                if (obj.user===Meteor.userId())
                {
                    visited=true;
                };
            });
            console.log(visited);

            if (visited)
            {
                console.log("kolejny raz");
                LogBooks.update({_id: LogBookId,"LastVisit.user": Meteor.userId()}, {$set: { "LastVisit.$.date": new Date()}});
            }else{
                console.log("pierwszyraz");
               LogBooks.update({_id: LogBookId}, {$push: {'LastVisit': {'user': Meteor.userId(), 'date': new Date()}}});
            }

        }
    }
    }
	});
