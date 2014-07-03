if(Meteor.isClient){
	function aggregate(){
		var one,two,three,four,five,a,b,c,d,e;
		one=Logs.find({LogSeverity:1});
		two=Logs.find({LogSeverity:2});
		three=Logs.find({LogSeverity:3});
		four=Logs.find({LogSeverity:4});
		five=Logs.find({LogSeverity:5});
		one.forEach(function() {a+=1;});
		two.forEach(function() {b+=1;});
		three.forEach(function() {c+=1;});
		four.forEach(function() {d+=1;});
		five.forEach(function() {e+=1;});
		console.log("Hi mom");
	
	}
}

Template.showLogs.created=function(){
	aggregate();
	Meteor.setInterval(aggregate,20*1000);


}

Template.showLogs.events({
    'submit form': function(e) {
        e.preventDefault();
        $(e.target).find('[level=Level]').val();
    },
    ownPost: function() {
        return this.AuthorID == Meteor.userId(); },
    'click .download': function (e) {
        csv = json2csv(Logs.find().fetch(), true, true)
        e.target.href = "data:text/csv;charset=utf-8," + escape(csv)
        e.target.download = "logs.csv"; }
    });

Template.showLogs.rendered=function()
{
        Meteor.call('updateTime',this.data.id);
}
Template.showLogs.events({
    'submit form[id=tagForm]': function(e) {
        e.preventDefault();
        var tag=$(e.target).find('#tag').val();
        console.log(tag);
        var path="/showLogs/"+this.id+"/tag/"+tag;
        Router.go(path)
    }
});
Template.showLogs.events({
    'submit form[id=levelForm]': function(e) {
        e.preventDefault();
        var level=$(e.target).find('#level').val();
       // console.log(this.id);
        var path="/showLogs/"+this.id+"/level/"+level;
        Router.go(path)
    }
})
function json2csv(objArray, headers, showHeaders) {

    if( typeof headers == "boolean" ){
        showHeaders = headers;
        headers = null;
    }

    var itens = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;

    //separate fields
    var fields = {};

    if( !headers ){
        for(var i = 0; i < itens.length; i++){
            for(var prop in itens[i]){
                if( !fields[prop] ){
                    fields[prop] = [];
                }
            }
        }
    }else{
        headers.forEach(function(header){ fields[header] = []; });
    }


    //getting data

    for(var i = 0; i < itens.length; i++){
        for(var prop in fields){
            if( typeof itens[i][prop] != "undefined" ){
                fields[prop].push( itens[i][prop] );
            }else{
                fields[prop].push( "" );
            }
        }
    }

    //make the csv

    var csvLines = [];

    if( showHeaders ){

        var lineFields = [];

        for(var prop in fields){
            lineFields.push(  prop );
        }

        var line = lineFields.join(", ");
        csvLines.push(line);

    }

    for(var i = 0; i < itens.length; i++){

        var lineFields = [];

        for(var prop in fields){
            lineFields.push(  fields[prop][i] );
        }

        var line = lineFields.join(", ");
        csvLines.push(line);
    }

    var csvStr = "sep=,\n" + csvLines.join("\n");

    return csvStr;
}

