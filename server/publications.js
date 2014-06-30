Meteor.publish('myLogBooks', function(authorId) {
  return LogBooks.find({AuthorID: authorId});
});
Meteor.publish('logs', function(LogBookId) {
    return Logs.find({LogBookID: LogBookId});
});
Meteor.publish('limits', function(userId) {
    return Limits.find({UserID: userId});
});
Meteor.publish('logBookUsers',function(flag,ID) {
    return LogBooks.find({_id: ID} ,{
        AuthorID: false,
        Created: false,
        Key: false
    });
});

Meteor.publish('friendsLogBooks',function(arg1,arg2,username) {
    return LogBooks.find({"users" : username});
});




