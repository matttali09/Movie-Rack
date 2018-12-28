$(document).ready(function() {
  $(".sidenav").sidenav();
  $('.carousel').carousel();
  $('.collapsible').collapsible();
  $( ".bottom-form" ).click(function() {
    $( ".bottom-form" ).animate({
      left: "+=50",
      width: "300px",
    }, 1000, function() {
      // Animation complete.
    });
  });
});
