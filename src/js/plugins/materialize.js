import "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";

//  init select

const select = document.querySelectorAll("select");
M.FormSelect.init(select);

export function getSelectInstnace(elem) {
  return M.FormSelect.getInstance(elem);
}

//  init autocomplete

const autocomplete = document.querySelectorAll(".autocomplete");
M.Autocomplete.init(autocomplete);

export function getAutocompleteInstnace(elem) {
  return M.Autocomplete.getInstance(elem);
}

//  init datepickers

const datepickers = document.querySelectorAll(".datepicker");
M.Datepicker.init(datepickers, {
  showClearBtn: true,
  format: "yyyy-mm",
});

export function getDatePickerInstnace(elem) {
  return M.Datepicker.getInstance(elem);
}

// drop down

let dropDown = document.querySelectorAll(".dropdown-trigger");
M.Dropdown.init(dropDown, {
  outDuration: 500,
});

export function getDropdownInstance(elem) {
  return M.Dropdown.getInstance(elem);
}
