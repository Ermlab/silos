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
            console.log(LogBookId);
            LogBooks.update({_id: LogBookId},{$push:{'LastVisit':{'user':Meteor.userId(),'date': new Date()}}});
        }
    }
    }
	});
