function checkLimit() {

    //fix here!

    var limit = Meteor.users.findOne()["Limit"];
    console.log(limit);
    if (LogBooks.find({AuthorID: Meteor.userId().toString()}).count() >= limit) {
        console.log('za duzo');
        //Meteor.rendered("manyLogBooks");
        Router.go("/manyLogBooks");

    }
}
Template.createLogBook.rendered=checkLimit;

Template.createLogBook.events({
        'submit form': function(e) {
            e.preventDefault();

            console.log("tutua");

            var LogBook = {
                Nazwa: $(e.target).find('[name=Nazwa]').val(),
                Key: Random.id(64),
                AuthorID: Meteor.userId(),
                Created: ((new Date).getTime()),
                LastVisit: []
            }
            LogBook._id = LogBooks.insert(LogBook);

            Router.go('/');
        }
    });

