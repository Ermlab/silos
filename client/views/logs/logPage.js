Template.logItem.rendered=function (){
    $(".severity").each(function() {
   switch ($( this ).text())
    {
        case "1":  $( this ).text("debug"); break;
        case "2":  $( this ).text("info"); break;
        case "3":  $( this ).text("warning"); break;
        case "4":  $( this ).text("erroor"); break;
        case "5":  $( this ).text("fatal"); break;
        default: break;
    }
    });
var i=0;
        $(".date").each(function() {
            i++;
            var numberDate=$( this ).html();
            var timestamp=(numberDate);

            if (isNaN(timestamp)==false)
            {
                console.log(timestamp*1);
                var d=new Date(timestamp*1);
                $( this ).html(d);

            }

        });
    console.log(i)

};

