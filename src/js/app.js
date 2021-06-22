import "../css/style.css";
import "./plugins";
import locations from "../js/store/locations.js";
import formUI from "../js/views/form";
import currencyUI from "../js/views/currency";
import ticketsUi from "../js/views/tickets";
import favoriteUI from "../js/store/favorites";

document.addEventListener("DOMContentLoaded", () => {
  initApp();
  favoriteUI.setTicketsOnLoad();

  const form = formUI.form;
  const ticketsContainer = ticketsUi.container;
  const favoriteTicketsContainer = favoriteUI.container;
  const favoriteTrigger = favoriteUI.trigger;

  // Events
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    onFormSubmit();
  });

  form.addEventListener("click", (event) => {
    if (event.target.name === "reset") {
      ticketsUi.clearContainer();
    }
  });

  ticketsContainer.addEventListener("click", favoritesOnClickHandler);
  favoriteTicketsContainer.addEventListener("click", deleteFavoriteHandler);
  favoriteTrigger.addEventListener("click", (event) => {
    event.preventDefault();
    favoriteUI.checkTheListLength();
  });

  // Handlers

  async function initApp() {
    await locations.init();
    formUI.setAutoCompleteData(locations.shortCitiesList);
  }

  async function onFormSubmit() {
    // данные из инпутов
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currencyValue;

    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });
    ticketsUi.renderTickets(locations.lastSeacrh);
  }

  function favoritesOnClickHandler(event) {
    if (event.target.classList.contains("favorites-svg")) {
      let parent = event.target.closest(".ticket__item");
      locations.lastSeacrh.forEach((search) => {
        if (search.id === parent.id) {
          favoriteUI.renderTicket(search);
          favoriteUI.addTicketToList(search);
          favoriteUI.setTicketsToLocalStorage(search);

        }
      });
    }
  }

  function deleteFavoriteHandler(event) {
    event.preventDefault();
    if (event.target.classList.contains("ticket__item--delete")) {
      let parent = event.target.closest(".ticket__item");
      favoriteUI.deleteTicketFromList(parent.id);
      parent.closest("li").remove();
    }
  }
});
