Template.editLogBook.events({
    'submit form': function(e) {
        e.preventDefault();


        var currentLogBookId = this.id;


        var json = [];

        $(".viewField").each(function(obj)
        {
            //if ($(this).val().length>1)
            //json.push({field: $(this).val()});
            var key=$(this).val();
            var value=$(this).is(":checked");
            var jsonVariable = {};
            jsonVariable['field']=key;
            jsonVariable['visible']=value;
            json.push(jsonVariable);
        });



        var newName=$(e.target).find('[name=Name]').val();
        LogBooks.update(currentLogBookId, {$set: {Name : (newName.length<2 ?LogBooks.findOne(currentLogBookId).Name : newName )
            , View : json }
        }, function(error) {
            if (error) {
                alert(error.reason);
            } else {
                Router.go('showLogBooks', {_id: currentLogBookId});
            }
        });
    },

'click .delete': function(e) {
e.preventDefault();

if (confirm("Delete LogBook?")) {
var currentLogBookId = this.id;
LogBooks.remove(currentLogBookId);
Router.go('showLogBooks');
}
},
'click .clean': function(e) {
    e.preventDefault();

    if (confirm("Delete all logs?")) {
        var currentLogBookId = this.id;
        Meteor.call('clearLogBook', currentLogBookId);
        Router.go('showLogBooks');
    }
},
'click .add': function(e) {
      //pozniej
        //Router.go('addUser');
        }


});

/*function checkUser () {
    var Author = Meteor.logBooks.findOne()["AuthorID"];
    if (Author!==Meteor.userId()) {
        Router.go("/noAccess");
    }
}

Template.editLogBook.rendered=checkUser;*/

