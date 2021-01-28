var socket = io();

$('#reset-tickets').on('click', function() {
  socket.emit('resetTickets');
})