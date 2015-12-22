$(document).ready(function() {
    $('#roll').click(function() {
        var val = document.getElementById("numberofsides");
        var numberRolled = Math.floor(Math.random() * (val.value) + 1);
        $('ul').append("<li>" + numberRolled + "</li>");
    });
    $('#clear').click(function() {
        $('li').remove();
    });
});