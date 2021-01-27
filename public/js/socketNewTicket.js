var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function () {
  console.log('Connected to the server');
});

socket.on('disconnect', function () {
  console.log('Disconnected to the server');
});

socket.on('currentState', function (ticket) {
  label.text(ticket.current);
});

$('#new-ticket-button').on('click', function () {
  socket.emit('nextTicket', null, function (nextTicket) {
    label.text(nextTicket);
  });
});
