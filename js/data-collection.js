'use strict';

(function () {

  window.backend.load(function (ticketsReceived) {
    window.dataCollection = {
      tickets: [],
      quantityTickets: ticketsReceived.length
    };

    ticketsReceived.forEach(function (element, index) {
      window.dataCollection.tickets[index] = element;
    });
  }, function (errorText) {
    window.backend.errorMessage(errorText);
  });
}());
