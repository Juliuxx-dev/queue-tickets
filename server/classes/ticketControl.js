const fs = require('fs');

class Ticket {
  constructor(number, desk) {
    this.number = number;
    this.desk = desk;
    this.last4Tickets = [];
  }
}

class TicketControl {
  constructor() {
    this.last = 0;
    this.today = new Date().getDate();
    this.tickets = [];

    let data = require('../data/data.json');

    if (data.today === this.today) {
      this.last = data.last;
      this.tickets = data.tickets;
      this.last4Tickets = data.last4Tickets;
    } else {
      this.resetTickets();
    }

    console.log(data);
  }

  resetTickets() {
    this.last = 0;
    this.tickets = [];
    this.last4Tickets = [];

    console.log('Data reset');
    this.saveFile();

  }

  lastTicket() {
    return `Ticket ${ this.last }`;
  }

  lastTickets() {
    return this.last4Tickets;
  }

  assignTicket(desk) {
    if (!this.tickets.length) {
      return 'There are no tickets';
    }

    let ticketNumber = this.tickets[0].number;

    this.tickets.shift();

    let assignedTicket = new Ticket(ticketNumber, desk);

    this.last4Tickets.unshift(assignedTicket);

    if (this.last4Tickets.length > 4) {
      this.last4Tickets.pop();
    }

    this.saveFile();
  
    return assignedTicket;
  }

  next() {
    this.last += 1;

    let ticket = new Ticket(this.last, null);
    this.tickets.push(ticket);

    this.saveFile();

    return `Ticket ${ this.last }`;
  }

  saveFile() {
    let jsonData = {
      last: this.last,
      today: this.today,
      tickets: this.tickets,
      last4Tickets: this.last4Tickets
    };

    fs.writeFileSync('./server/data/data.json', JSON.stringify(jsonData));
  }
}

module.exports = {
  TicketControl
};