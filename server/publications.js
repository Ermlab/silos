Meteor.publish('logBooks', function(authorId) {
  return LogBooks.find({AuthorID: authorId});
});
