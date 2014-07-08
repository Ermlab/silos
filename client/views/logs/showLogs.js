var a=0,b=0,c=0,d=0,e=0,all=0;
var interval1, interval2;
function drawChart(){
	document.getElementById("one").innerHTML=a;
	document.getElementById("two").innerHTML=b;
	document.getElementById("three").innerHTML=c;
	document.getElementById("four").innerHTML=d;
	document.getElementById("five").innerHTML=e;
	document.getElementById("all").innerHTML=all;
	if(all!=0){
	document.getElementById("jeden").innerHTML=(a/all)*100+"%";
	document.getElementById("dwa").innerHTML=b/all*100+"%";
	document.getElementById("trzy").innerHTML=c/all*100+"%";
	document.getElementById("cztery").innerHTML=d/all*100+"%";
	document.getElementById("piec").innerHTML=e/all*100+"%";
	}
	else{
	document.getElementById("jeden").innerHTML=0;
	document.getElementById("dwa").innerHTML=0;
	document.getElementById("trzy").innerHTML=0;
	document.getElementById("cztery").innerHTML=0;
	document.getElementById("piec").innerHTML=0;
	}
	
  var data = [
    {
        value: a,
        color:"#7FFF00"
    },
    {
        value: b,
        color: "#6495ED"
    },
    {
        value: c,
        color: "#FFFF00"
    },
 {
        value: d,
        color: "#FFA500"
    },
 {
        value: e,
        color: "#FF0000"
    }
]
  var ctx = $("#myChart").get(0).getContext("2d");
  var myNewChart = new Chart(ctx);
  new Chart(ctx).Pie(data);
}



if(Meteor.isClient){
	function aggregate(){
	a=0,b=0,c=0,d=0,e=0,all=0;
		a=Logs.find({LogSeverity: '1'}).count();
		b=Logs.find({LogSeverity: '2'}).count();
		c=Logs.find({LogSeverity: '3'}).count();
		d=Logs.find({LogSeverity: '4'}).count();
		e=Logs.find({LogSeverity: '5'}).count();
		all=Logs.find().count();
		drawChart();	
		
}
}


Template.showLogs.created=function(){
	a=0; b=0; c=0; d=0; e=0; all=0;
	Meteor.setTimeout(aggregate,5*1000);
	interval2 = Meteor.setInterval(aggregate,30*1000);
	


}
Template.showLogs.destroyed=function(){
	Meteor.clearInterval(interval2);
	a=0;
	b=0;
	c=0;
	d=0;
	e=0;
	all=0;

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
        e.target.download = "logs.csv"; },

    'click .export': function (e) {
        csv = json2csv(Logs.find().fetch(), true, true)
        e.target.href = "data:text/xls;charset=utf-8," + escape(csv)
        e.target.download = "logs.xls";
    }
});

Template.showLogs.rendered=function()
{
        Meteor.call('updateTime',this.data.id);
        Meteor.call('updateTime',this.data.id);
}
Template.showLogs.events({
    'submit form[id=tagForm]': function(e) {
        e.preventDefault();
        var tag=$(e.target).find('#tag').val();
        var path="/showLogs/"+this.id+"/tag/"+tag;
        Router.go(path)
    }
});
Template.showLogs.events({
    'submit form[id=levelForm]': function(e) {
        e.preventDefault();
        var level=$(e.target).find('#level').val();
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
            lineFields.push( prop );
        }

        var line = lineFields.join(", ");
        csvLines.push(line);

    }

    for(var i = 0; i < itens.length; i++){

        var lineFields = [];

        for(var prop in fields){
            lineFields.push( fields[prop][i] );
        }

        var line = lineFields.join(", ");
        csvLines.push(line);
    }

    //var csvStr = "sep=,\n" + csvLines.join("\n");

    return csvLines.join("\n");
}
var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var fromCharCode = String.fromCharCode;
var INVALID_CHARACTER_ERR = ( function() {
    // fabricate a suitable error object
    try {
        document.createElement('$');
    } catch (error) {
        return error;
    }
}());

// encoder
window.btoa || (window.btoa = function(string) {
    var a, b, b1, b2, b3, b4, c, i = 0, len = string.length, max = Math.max, result = '';

    while (i < len) {
        a = string.charCodeAt(i++) || 0;
        b = string.charCodeAt(i++) || 0;
        c = string.charCodeAt(i++) || 0;

        if (max(a, b, c) > 0xFF) {
            throw INVALID_CHARACTER_ERR;
        }

        b1 = (a >> 2) & 0x3F;
        b2 = ((a & 0x3) << 4) | ((b >> 4) & 0xF);
        b3 = ((b & 0xF) << 2) | ((c >> 6) & 0x3);
        b4 = c & 0x3F;

        if (!b) {
            b3 = b4 = 64;
        } else if (!c) {
            b4 = 64;
        }
        result += characters.charAt(b1) + characters.charAt(b2) + characters.charAt(b3) + characters.charAt(b4);
    }
    return result;
});

// decoder
window.atob || (window.atob = function(string) {
    string = string.replace(/=+$/, '');
    var a, b, b1, b2, b3, b4, c, i = 0, len = string.length, chars = [];

    if (len % 4 === 1)
        throw INVALID_CHARACTER_ERR;

    while (i < len) {
        b1 = characters.indexOf(string.charAt(i++));
        b2 = characters.indexOf(string.charAt(i++));
        b3 = characters.indexOf(string.charAt(i++));
        b4 = characters.indexOf(string.charAt(i++));

        a = ((b1 & 0x3F) << 2) | ((b2 >> 4) & 0x3);
        b = ((b2 & 0xF) << 4) | ((b3 >> 2) & 0xF);
        c = ((b3 & 0x3) << 6) | (b4 & 0x3F);

        chars.push(fromCharCode(a));
        b && chars.push(fromCharCode(b));
        c && chars.push(fromCharCode(c));
    }
    return chars.join('');
});


ExcellentExport = (function() {
    var version = "1.3";
    var uri = {excel: 'data:application/vnd.ms-excel;base64,', csv: 'data:application/csv;base64,'};
    var template = {excel: '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'};
    var base64 = function(s) {
        return window.btoa(unescape(encodeURIComponent(s)));
    };
    var format = function(s, c) {
        return s.replace(/{(\w+)}/g, function(m, p) {
            return c[p];
        });
    };

    var get = function(element) {
        if (!element.nodeType) {
            return document.getElementById(element);
        }
        return element;
    };

    var fixCSVField = function(value) {
        var fixedValue = value;
        var addQuotes = (value.indexOf(',') !== -1) || (value.indexOf('\r') !== -1) || (value.indexOf('\n') !== -1);
        var replaceDoubleQuotes = (value.indexOf('"') !== -1);

        if (replaceDoubleQuotes) {
            fixedValue = fixedValue.replace(/"/g, '""');
        }
        if (addQuotes || replaceDoubleQuotes) {
            fixedValue = '"' + fixedValue + '"';
        }
        return fixedValue;
    };

    var tableToCSV = function(table) {
        var data = "";
        for (var i = 0, row; row = table.rows[i]; i++) {
            for (var j = 0, col; col = row.cells[j]; j++) {
                data = data + (j ? ',' : '') + fixCSVField(col.innerHTML);
            }
            data = data + "\r\n";
        }
        return data;
    };

    var ee = {
        /** @expose */
        excel: function(anchor, table, name) {
            table = get(table);
            var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML};
            var hrefvalue = uri.excel + base64(format(template.excel, ctx));
            anchor.href = hrefvalue;
            // Return true to allow the link to work
            return true;
        },
        /** @expose */
        csv: function(anchor, table) {
            table = get(table);
            var csvData = tableToCSV(table);
            var hrefvalue = uri.csv + base64(csvData);
            anchor.href = hrefvalue;
            return true;
        }
    };

    return ee;
}());
