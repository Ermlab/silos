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

