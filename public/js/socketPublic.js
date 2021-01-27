var socket = io();
var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');
var lblDesk1 = $('#lblDesk1');
var lblDesk2 = $('#lblDesk2');
var lblDesk3 = $('#lblDesk3');
var lblDesk4 = $('#lblDesk4');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblDesks = [lblDesk1, lblDesk2, lblDesk3, lblDesk4];

socket.on('currentState', function (data) {
  updateHTML(data.lastTickets);
});

socket.on('lastTickets', function (data) {
  var audio = new Audio('../audio/new-ticket.mp3');
  audio.play();

  updateHTML(data.lastTickets);
});

function updateHTML(lastTickets) {
  for (var index = 0; index <= lastTickets.length - 1; index++) {
    const element = lastTickets[index];
    lblTickets[index].text('Ticket ' + lastTickets[index].number);
    lblDesks[index].text('Escritorio ' + lastTickets[index].desk);
  }
}