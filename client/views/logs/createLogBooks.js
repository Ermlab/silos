Template.createLogBook.rendered=function() {
    if (LogBooks.find({AuthorID: Meteor.userId().toString()}).count()>2)
    {
        console.log('za duzo');
        Router.go("/manyLogBooks");

    }
}

Template.createLogBook.events({
        'submit form': function(e) {
            e.preventDefault();



            var LogBook = {
                Nazwa: $(e.target).find('[name=Nazwa]').val(),
                Key: Random.id(64),
                AuthorID: Meteor.userId(),
                Created: ((new Date).getTime())
            }
            LogBook._id = LogBooks.insert(LogBook);

            Router.go('/',LogBook);
        }
    });

