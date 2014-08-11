Template.masterLayout.rendered = function () {
    $("#main").css("margin-top", d3.select('#navbar').style('height'));
};