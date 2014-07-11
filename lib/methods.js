function getSearch(Hash)
{
    var search=Hash.toString().substring(2);
    console.log(search);
    if (Hash.length>1)
    {

        return search.split("=");
    }else{
        return [ ];
    }
}
function getLevel(Hash)
{
    console.log(Hash[0]);
    if (Hash.length>0)
    {
        return Hash[0];
    }else{
        return 0;
    }
}
Meteor.methods({
    createTable: function(ID) {
    var table="<thead><tr>";
        Meteor.subscribe('logs', ID);
    var fields=LogBooks.findOne().View;
    console.log(fields);
    fields.forEach(function f(field)
    {
        if (field.visible)
            table+="<td>"+  field.field+"</td>";

    });
    table+="</tr></thead><tbody>";
    var findLogs;

    var hash = window.location.hash.substring(1);
    var tag=getSearch(hash);

    var json=[]
    var jsonVariable = {};
    console.log(hash);
    if (hash.length>=1){
        jsonVariable['LogSeverity'] = getLevel(hash);
        console.log(getLevel(hash));
        var search=getSearch(hash);
        if (search.length>1)
        {
            jsonVariable[search[0]]=search[1];
        }
        json.push(jsonVariable);
    }
    if (json.length>0)
    {
        //console.log(json[0]);
       // console.log(Logs.find(json[0]).count());
        findLogs = Logs.find(json[0]).fetch();
    }else{
        findLogs = Logs.find({LogBookID:ID}).fetch();
    }

    findLogs.forEach(function makeTable(entity)
    {
        table+="<tr>";
        fields.forEach(function f(field)
        {
            if (field.visible)
                switch(field.field) {
                    case "LogDate":
                    {
                        var timestamp=entity[field.field];

                        if (isNaN(timestamp)==false) {
                            var d = new Date(timestamp * 1);
                            table += "<td>" + d + "</td>";
                        }
                        break
                    }
                    case "LogSeverity":
                    {
                        var severityName;
                        switch (entity[field.field])
                        {
                            case "1":  severityName= ("debug"); break;
                            case "2":  severityName= ("info"); break;
                            case "3":  severityName= ("warning"); break;
                            case "4":  severityName= ("error"); break;
                            case "5":  severityName= ("fatal"); break;
                            default: break;
                        }
                        table += "<td>" + severityName+ "</td>";
                        break
                    }
                    default:
                    {
                        table += "<td>" + entity[field.field] + "</td>";
                    }
                }


        });
        table+="</tr>"
    });
    table+="</tbody>";
    $("#logsTable").html(table);
},
clearLogBook: function (LogBookId) {
	console.log('removing', LogBookId);
	if (!this.isSimulation)
	{
		Logs.remove({LogBookID: LogBookId});
	}
	},
    updateTime: function (LogBookId) {
        if (Meteor.isServer) {
        if (!this.isSimulation) {
            var Logbooks=LogBooks.findOne({_id: LogBookId});
            var visited=false;
            Logbooks.LastVisit.forEach(function (obj)
            {
                if (obj.user===Meteor.userId())
                {
                    visited=true;
                };
            });
            console.log(visited);

            if (visited)
            {
                LogBooks.update({_id: LogBookId,"LastVisit.user": Meteor.userId()}, {$set: { "LastVisit.$.date": new Date()}});
            }else{
               LogBooks.update({_id: LogBookId}, {$push: {'LastVisit': {'user': Meteor.userId(), 'date': new Date()}}});
            }

        }
    }
    }
	});
