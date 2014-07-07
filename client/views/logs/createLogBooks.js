function checkLimit() {

    //fix here!

    var limit = Meteor.users.findOne()["Limit"];
    if (LogBooks.find({AuthorID: Meteor.userId().toString()}).count() >= limit) {
        //Meteor.rendered("manyLogBooks");
        Router.go("/manyLogBooks");

    }
}
Template.createLogBook.rendered=checkLimit;

Template.createLogBook.events({
        'submit form': function(e) {
            e.preventDefault();

            var LogBook = {
                Name: $(e.target).find('[name=Nazwa]').val(),
                Key: Random.id(64),
                AuthorID: Meteor.userId(),
                Created: ((new Date).getTime()),
                View: [],
                LastVisit: []
            }
            LogBook._id = LogBooks.insert(LogBook);

            Router.go('/');
        }
    });

