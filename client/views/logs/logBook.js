Template.logBook.helpers({
ownPost: function() {
	return this.AuthorID == Meteor.userId(); }
});
Template.logBook.rendered=function (){
    $(".date").each(function() {
        var numberDate=$( this ).html();
        var timestamp=(numberDate);

        if (isNaN(timestamp)==false)
        {
            var d=new Date(timestamp*1);
            $( this ).html(d);

        }
    });


};
Template.logBookSub.events({
    'click .goTologBook': function(e)
    {
        gotToLogBook(e)
    }
});
Template.logBook.events({
    'click .goTologBook': function(e)
    {
        gotToLogBook(e)
    }
});
function gotToLogBook(e)
{
    var adress=e.target.href.split("/");
    var ID=adress[adress.length-1]
    Meteor.call('createTable',ID);
}
Template.logBookSub.rendered=function (){
    $(".date").each(function() {
        var numberDate=$( this ).html();
        var timestamp=(numberDate);

        if (isNaN(timestamp)==false)
        {
            var d=new Date(timestamp*1);
            $( this ).html(d);

        }
    });


};

