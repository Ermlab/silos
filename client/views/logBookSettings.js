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