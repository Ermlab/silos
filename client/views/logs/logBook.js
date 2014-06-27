Template.logBook.rendered=function (){
    $(".date").each(function() {
        var numberDate=$( this ).html();
        var timestamp=(numberDate);

        if (isNaN(timestamp)==false)
        {
            console.log(timestamp*1);
            var d=new Date(timestamp*1);
            $( this ).html(d);

        }
    });


};

