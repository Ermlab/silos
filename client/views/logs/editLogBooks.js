Template.editLogBook.events({
    'submit form': function(e) {
        e.preventDefault();


        var currentLogBookId = this._id;

        var logBookProperties = {
            Name: $(e.target).find('[name=Name]').val()


        }



        LogBooks.update(currentLogBookId, {$set: logBookProperties}, function(error) {
            if (error) {
                alert(error.reason);
            } else {
                Router.go('showLogBooks', {_id: currentLogBookId});
            }
        });
    },

'click .delete': function(e) {
e.preventDefault();

if (confirm("Usunac LogBooka?")) {
var currentLogBookId = this._id;
console.log(LogBooks.find({_id: currentLogBookId}).count());
LogBooks.remove(currentLogBookId);
console.log(LogBooks.find({_id: currentLogBookId}).count());
Router.go('showLogBooks');
}
},
'click .clean': function(e) {
    e.preventDefault();

    if (confirm("Usunac wszystkie logi?")) {
        var currentLogBookId = this._id;
        Meteor.call('clearLogBook', currentLogBookId);
        Router.go('showLogBooks');
    }
},
'click .add': function(e) {
      //pozniej
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
        console.log(jSon);
    },
    'click .new': function(e) {
        var form = document.getElementsByTagName('form')[0],
            input = document.createElement('input'),
            br = document.createElement("br");

        input.setAttribute('type', 'text');
        input.setAttribute('name', 'pole');
        form.appendChild(br);
        form.appendChild(input);



    }

});
