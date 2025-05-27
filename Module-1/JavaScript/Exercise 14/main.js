$(document).ready(function () {
  $('#registerBtn').click(function () {
    if ($('#eventCard').is(':visible')) {
      $('#eventCard').fadeOut(400);
    } else {
      $('#eventCard').fadeIn(400);
    }
  });
});
