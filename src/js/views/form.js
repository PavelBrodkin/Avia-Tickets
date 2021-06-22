import {
  getAutocompleteInstnace,
  getDatePickerInstnace,
} from "../plugins/materialize";

class FormUI {
  constructor(autocompleteInstnace, datePickerInstnace) {
    this._form = document.forms["locationControls"];
    this.origin = document.getElementById("autocomplete-origin");
    this.destination = document.getElementById("autocomplete-destination");
    this.depart = document.getElementById("datepicker-depart");
    this.return = document.getElementById("datepicker-return");
    this.reset = this._form.elements["reset"];
    this.originAutoComplete = autocompleteInstnace(this.origin);
    this.destinationAutoComplete = autocompleteInstnace(this.destination);
    this.departDatePicker = datePickerInstnace(this.depart);
    this.returnDatePicker = datePickerInstnace(this.return);
  }

  get form() {
    return this._form;
  }

  get originValue() {
    return this.origin.value;
  }

  get destinationValue() {
    return this.destination.value;
  }

  get departDateValue() {
    return this.departDatePicker.toString();
  }

  get returnDateValue() {
    return this.returnDatePicker.toString();
  }



  setAutoCompleteData(data) {
    this.originAutoComplete.updateData(data);
    this.destinationAutoComplete.updateData(data);
  }
}

const formUI = new FormUI(getAutocompleteInstnace, getDatePickerInstnace);
export default formUI;
