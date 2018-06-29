'use strict';

(function () {

  window.backend.load(function (ticketsReceived) {
    window.dataCollection = {
      tickets: [],
      quantityTickets: ticketsReceived.length
    };

    for (var i = 0; i < ticketsReceived.length; i++) {
      window.dataCollection.tickets[i] = ticketsReceived[i];
    }
  }, function (errorText) {
    window.backend.errorMessage(errorText);
  });
}());
