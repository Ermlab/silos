

Template.showLogBooks.myLogBooks=function()
{
    Meteor.subscribe('myLogBooks', Meteor.userId());
    var la = LogBooks.find({AuthorID: Meteor.userId().toString()}).fetch();
    _.each(la,function(obj) {
        try {
            obj.isntRead = Logs.find({LogBookID: obj._id, LogDate: {$gt: (new Date(obj.LastVisit[0].date).getTime())}}).count();

        } catch (E) {
            obj.isntRead = Logs.find({LogBookID: obj._id}).count();
        };
    });
    return la;
}
Template.showLogBooks.friendsLogBooks=function()
{
    var user = Meteor.user();
    var email = user && user.emails && user.emails[0].address;
    Meteor.subscribe('friendsLogBooks',1,2 ,email);
    var user = Meteor.user();
    var email = user && user.emails && user.emails[0].address;
    var lb=LogBooks.find({"users" : email}).fetch();
    _.each(lb,function(obj) {
        try {
            obj.isntRead = Logs.find({LogBookID: obj._id, LogDate: {$gt: (new Date(obj.LastVisit[0].date).getTime())}}).count();
        } catch (E) {
            obj.isntRead = Logs.find({LogBookID: obj._id}).count();
        }
    });
    return lb;
}



