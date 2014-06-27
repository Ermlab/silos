Meteor.publish('logBooks', function(authorId) {
  return LogBooks.find({AuthorID: authorId});
});
Meteor.publish('logs', function(LogBookId) {
    return Logs.find({LogBookID: LogBookId});
});
