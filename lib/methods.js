Meteor.methods({
	clearLogBook: function (LogBookId) {
	console.log('removing', LogBookId);
	if (!this.isSimulation)
	{
		Logs.remove({LogBookID: LogBookId});
	}
	}
	});
