const { io } = require('../server');
const { TicketControl } = require('../classes/ticketControl');

let ticketControl = new TicketControl();

io.on('connection', (client) => {
  client.on('nextTicket', (data, callback) => {
    let next = ticketControl.next();

    if (!callback) return;

    callback(next);

    console.log('The next ticket is: ', next);
  });

  client.emit('currentState', {
    current: ticketControl.lastTicket(),
    lastTickets: ticketControl.lastTickets()
  });

  client.on('assignTicket', (data, callback) => {
    if (!data.desk) {
      return callback({
        err: false,
        message: 'The desk number is required'
      })
    }

    if (!callback) {
      return {
        err: false,
        message: 'There is no callback function'
      }
    } else {
      let assignedTicket = ticketControl.assignTicket(data.desk);
      callback(assignedTicket);

      client.broadcast.emit('lastTickets', {
        current: ticketControl.lastTicket(),
        lastTickets: ticketControl.lastTickets()
      });

    }
  });
});