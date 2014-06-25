Meteor.publish('logBooks', function() {
  return LogBooks.find();
});
