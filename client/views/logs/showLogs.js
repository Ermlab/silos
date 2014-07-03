var a=0,b=0,c=0,d=0,e=0;
function drawChart(){
console.log(a);
console.log(b);
console.log(c);
console.log(d);
console.log(e);

	
  var data = [
    {
        value: a,
        color:"#7FFF00",
        highlight: "#FF5A5E",
        label: "Green"
    },
    {
        value: b,
        color: "#6495ED",
        highlight: "#5AD3D1",
        label: "Blue"
    },
    {
        value: c,
        color: "#FFFF00",
        highlight: "#FFC870",
        label: "Yellow"
    },
 {
        value: d,
        color: "#FFA500",
        highlight: "#5AD3D1",
        label: "Orange"
    },
 {
        value: e,
        color: "#FF0000",
        highlight: "#5AD3D1",
        label: "Red"
    }
]
  var ctx = $("#myChart").get(0).getContext("2d");
  var myNewChart = new Chart(ctx);

  new Chart(ctx).Pie(data);
}

Template.chart.rendered = function(){
	drawChart();
	Meteor.setInterval(drawChart,21*1000);
}

if(Meteor.isClient){
	function aggregate(){
		var one,two,three,four,five;
		a=0,b=0,c=0,d=0,e=0;
		one=Logs.find({LogSeverity: 1}).fetch();
		two=Logs.find({LogSeverity: 2});
		three=Logs.find({LogSeverity: 3});
		four=Logs.find({LogSeverity: 4});
		five=Logs.find({LogSeverity: 5});
		one.forEach(function() {a+=1;});
		two.forEach(function() {b+=1;});
		three.forEach(function() {c+=1;});
		four.forEach(function() {d+=1;});
		five.forEach(function() {e+=1;});
		a+=1;
		b+=1;
		c+=1;
		d+=1;
		e+=1;		
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

