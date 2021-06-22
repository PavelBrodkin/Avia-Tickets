class CurrencyUI {
  constructor() {
    this.currency = document.getElementById("currency");
    this.dictionaty = {
      USD: "$",
      EUR: "€",
      RUB: "₽",
    };
  }
  get currencyValue() {
    return this.currency.value;
  }

  getСurrencySymbol() {
    return this.dictionaty[this.currencyValue];
  }
}

const currencyUI = new CurrencyUI();
export default currencyUI;