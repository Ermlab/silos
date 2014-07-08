Template.editLogBook.events({
    'submit form': function(e) {
        e.preventDefault();


        var currentLogBookId = this.id;


        var json = [];
        $(".viewFiled").each(function(obj)
        {
            if ($(this).val().length>1)
            json.push({field: $(this).val()});

        });
        //LogBooks.update({_id: currentLogBookId},{$set: { 'View' : json}});

        console.log(currentLogBookId);
        console.log(LogBooks.findOne(currentLogBookId).Name);
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
var currentLogBookId = this._id;
LogBooks.remove(currentLogBookId);
Router.go('showLogBooks');
}
},
'click .clean': function(e) {
    e.preventDefault();

    if (confirm("Delete all logs?")) {
        var currentLogBookId = this._id;
        Meteor.call('clearLogBook', currentLogBookId);
        Router.go('showLogBooks');
    }
},
'click .add': function(e) {
      //pozniej
        Router.go('addUser');
        },


'submit #viewForm': function(e) {
        e.preventDefault();
        jSon=[];
        $(".fields").each(function(index,value)
        {
            if ($(value).val().length>0) {
                jSon.push($(value).val());
            }
        });
        LogBooks.update({_id: this._id}, {$set : {View : jSon}});
    },
    'click .new': function(e) {
        var form = document.getElementsByTagName('form')[0],
            input = document.createElement('input'),
            br = document.createElement("br");

        input.setAttribute('type', 'text');
        input.setAttribute('name', 'pole');
        input.setAttribute('class','viewFiled');
        form.appendChild(br);
        form.appendChild(input);

    }

});

/*function checkUser () {
    var Author = Meteor.logBooks.findOne()["AuthorID"];
    if (Author!==Meteor.userId()) {
        Router.go("/noAccess");
    }
}

Template.editLogBook.rendered=checkUser;*/

