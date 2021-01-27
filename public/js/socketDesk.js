var socket = io();
var label = $('#assigned-ticket');

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('desk')) {
  window.location = 'index.html';
  throw new Error('The desk number is required');
}

var deskNumber = searchParams.get('desk');

$('#desk-number').text(deskNumber);

$('#assign-button').on('click', function () {

  socket.emit('assignTicket', {desk: deskNumber}, function (response) {

    if (response === 'There are no tickets') {
      label.text(response).css('color', 'red');
      alert(response);
      return;
    }

    label.text(response.number);
  });
});