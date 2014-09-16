Template.logBookSettings.rendered = function () {
    // Focus on edit#name when settings page is opened for a new logbook
    if (Session.get('newLogbookCreated')) {
        $('#name').select();
        Session.set('newLogbookCreated', false);
    }
};

Template.logBookSettings.events({
    'keyup input#name': function (e) {
        var val = $(e.currentTarget).val();
        if (val) {
            LogBooks.update(this._id, {
                $set: {
                    Name: val
                }
            });
        }
    },

    'click button#purge': function (e) {
        e.preventDefault();
        Meteor.call('clearLogBook', this._id);
    },

    'click button#delete': function (e) {
        e.preventDefault();
        if (confirm("You are going to delete the logbook. Ary you sure?")) {
            LogBooks.remove(this._id);
            Router.go('/');
        }
    },



    /*
    'submit form': function (e) {
        e.preventDefault();


        var currentLogBookId = this.id;


        var json = [];

        $(".viewField").each(function (obj) {
            //if ($(this).val().length>1)
            //json.push({field: $(this).val()});
            var key = $(this).val();
            var value = $(this).is(":checked");
            var jsonVariable = {};
            jsonVariable['field'] = key;
            jsonVariable['visible'] = value;
            json.push(jsonVariable);
        });




        var newName = $(e.target).find('[name=Name]').val();
        LogBooks.update(currentLogBookId, {
            $set: {
                Name: (newName.length < 2 ? LogBooks.findOne(currentLogBookId).Name : newName),
                View: json
            }
        }, function (error) {
            if (error) {
                alert(error.reason);
            } else {
                Router.go('showLogs', {
                    _id: currentLogBookId
                });
            }
        });
    },

    'click .add': function (e) {
        //pozniej
        //Router.go('addUser');
    }
    */


});

//FIXME: refactor
Template.addUser.events({
    'submit form': function (e) {
        e.preventDefault();

        Nazwa = $(e.target).find('[name=Nazwa]').val();
        console.log(Nazwa);
        LogBooks.update({
            _id: this.id
        }, {
            $push: {
                users: Nazwa
            }
        });

        Router.go('/editLogBook/' + this.id);
    }
});
Template.bookUser.isEmail = function () {
    return this.constructor === String;
}

/*function checkUser () {
    var Author = Meteor.logBooks.findOne()["AuthorID"];
    if (Author!==Meteor.userId()) {
        Router.go("/noAccess");
    }
}

Template.editLogBook.rendered=checkUser;*/