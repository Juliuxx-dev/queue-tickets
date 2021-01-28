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
  if (!lastTickets.length) {
    for (let index = 0; index < 4; index++) {
      if (index === 0) {
        lblTickets[0].text('Esperando...');
        lblDesks[0].text('');
      } else {
        lblTickets[index].text('');
        lblDesks[index].text('');
      }
    }
  } else {
    for (var index = 0; index < lastTickets.length; index++) {
      lblTickets[index].text('Ticket ' + lastTickets[index].number);
      lblDesks[index].text('Escritorio ' + lastTickets[index].desk);
    }
  }

}