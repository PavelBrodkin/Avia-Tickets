import currencyUI from "../views/currency";

class TicketsUI {
  constructor(currency) {
    this.container = document.querySelector(".tickets__wrapper");
    this.getСurrencySymbol = currency.getСurrencySymbol.bind(currency);
  }

  renderTickets(tikets) {
    this.clearContainer();
    if (!tikets.length) {
      this.showEmptyMessage();
      return;
    }

    let fragment = "";
    const currency = this.getСurrencySymbol();
    tikets.forEach((ticket) => {
      const template = TicketsUI.ticketTemplate(ticket, currency);
      fragment += template;
    });

    this.container.insertAdjacentHTML("afterbegin", fragment);
  }

  clearContainer() {
    this.container.innerHTML = "";
  }

  showEmptyMessage() {
    const template = TicketsUI.emptyMsgTamplate();
    this.container.insertAdjacentHTML("afterbegin", template);
  }

  static emptyMsgTamplate() {
    return `
    <div class="container">
     <div class="wrapper">
       <div class="tickets-not-found">
         <div class="not-found-text">
           По вашему запросу билетов не найдено
         </div>
       </div>
      </div>
    </div>
    `;
  }

  static ticketTemplate(ticket, currency) {
    return `
       <div class="ticket__item" id="${ticket.id}">
          <div class="ticket__header">
            <img class="ticket__logo"
              src="${ticket.airline_logo}"
              alt="/">
            <div class="ticket__logo-name">${ticket.airline_name}</div>
          </div>
          <div class="ticket__body">
            <div class="ticket_body-cities">
              <div class="ticket_body-cities-one">${ticket.origin_name}</div>
              <div class="ticket_body-cities-two">${ticket.destination_name}</div>
            </div>
            <div class="ticket_body-info">
              <div class="ticket_body-date">${ticket.departure_at}</div>
              <div class="ticket_body-price">${currency} ${ticket.price}</div>
            </div>
          </div>
          <div class="ticket__footer">
          Пересадок: ${ticket.transfers} Номер рейса: ${ticket.flight_number}
           <div class="add-to-favorites">
             <img class="favorites-svg" src="https://cdn.worldvectorlogo.com/logos/heart.svg" alt="/">
            </div>
          </div>
        </div>
        `;
  }
}

const ticketsUi = new TicketsUI(currencyUI);

export default ticketsUi;
