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

