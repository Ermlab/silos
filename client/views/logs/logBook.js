Template.logBook.rendered=function (){
    $(".date").each(function() {
        var numberDate=$( this ).html();
      //  console.log();
        var myDate=new Date(parseFloat(numberDate));
       //console.log(myDate.toDateString());
        $( this ).text(myDate.toLocaleDateString());
    });


};

