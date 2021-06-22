import { ta } from "date-fns/locale";
import currencyUI from "../views/currency";

class Favorites {
  constructor(currency) {
    this.container = document.querySelector(".dropdown-content");
    this.trigger = document.querySelector(".dropdown-trigger");
    this.getСurrencySymbol = currency.getСurrencySymbol.bind(currency);
    this.favoriteTicketsList = {};
  }

  renderTicket(ticket) {
    if (!ticket || this.favoriteTicketsList[ticket.id]) {
      return;
    }
    const currency = this.getСurrencySymbol();
    let tamplate = this.favoritetTicketTemplate(ticket, currency);
    this.container.insertAdjacentHTML("beforeend", tamplate);
  }

  addTicketToList(ticket) {
    this.favoriteTicketsList[ticket.id] = ticket;
  }

  deleteTicketFromList(id) {
    delete this.favoriteTicketsList[id];
    localStorage.removeItem(id);
  }

  checkTheListLength() {
    if (localStorage.length <= 1) {
      alert("В избранном ничего нет");
      return;
    }
  }

  setTicketsToLocalStorage(ticket) {
    localStorage.setItem(ticket.id, JSON.stringify(ticket));
  }

  setTicketsOnLoad() {
    if (localStorage.length) {
      for (let key in localStorage) {
        if (key !== "loglevel:webpack-dev-server") {
          const lastSelectedTicket = JSON.parse(localStorage.getItem(key));
          this.renderTicket(lastSelectedTicket);
        }
      }
    }
  }

  favoritetTicketTemplate(ticket, currency) {
    return `
      <li>
        <a href="#!">
          <div class="ticket__item drop" id="${ticket.id}">
            <div class="ticket__header">
              <img class="ticket__logo" src="${ticket.airline_logo}" alt="/">
              <div class="ticket__logo-name">${ticket.airline_name}</div>
              <div class="ticket__item--delete">
                Delete
              </div>
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
            <div class="ticket__footer"> Пересадок: ${ticket.transfers} Номер рейса: ${ticket.flight_number}</div>
          </div>
        </a></li>
      `;
  }
}

const favoriteUI = new Favorites(currencyUI);
export default favoriteUI;
