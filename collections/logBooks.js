LogBooks = new Meteor.Collection('logBooks');
LogBooks.allow({
	insert: function(userId, doc) {

	return !! userId;
	},
	update: ownsDocument,
	remove: ownsDocument

});

Users = new Meteor.Collection('userData');

Users.allow({
    update: function(userId, doc, fields, modifier)
    {
        return true;
    }
});

Logs = new Meteor.Collection('logs');
function parse(doc)
{
    var visible;
    if (Logs.find({LogBookID:doc['LogBookID']}).count()==1)
    {
        visible=true;
    }else{
        visible=false;
    }
    console.log(visible);
    var View=LogBooks.findOne(doc['LogBookID']).View;
    //console.log(View);

            for(var key in doc) {
                var i=View.length;
                var j=0;

                View.forEach(function f(obj)
                {
                    if (key===obj.field)
                    {
                        return 0;
                    }else {
                        j++;
                    }
                });
                console.log(key);
                if (j==i || i==0)
                {

                    LogBooks.update({_id:doc['LogBookID']},{$push : {View : { field : key , visible: visible }}});
                }
            }
}
Logs.after.insert(function (userId, doc) {
    parse(doc);
});
Logs.after.update(function (userId, doc) {
    parse(doc);
});

//LogBookUsers=new Meteor.Collection('logBookUsers');

Logs.allow({
	insert: function(userId, doc) {

	return !! userId;},
	remove: function(userId, doc) {

	return true;
	}

});
Houston.add_collection(Meteor.users);
