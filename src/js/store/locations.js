import api from "../services/apiService";
import formatDate from "../helpers/data";
import { v4 as uuidv4 } from 'uuid';

class Locations {
  constructor(api, helpers) {
    this.api = api;
    this.countries = null;
    this.cities = null;
    this.airliners = null;
    this.shortCitiesList = null;
    this.lastSeacrh = null;
    this.formatDate = helpers.formatDate;
  }
  async init() {
    const response = await Promise.all([
      this.api.countries(),
      this.api.cities(),
      this.api.airlines(),
    ]);
    const [countries, cities, airlines] = response;
    this.countries = this.serializeCountries(countries);
    this.cities = this.serializeCities(cities);
    this.airliners = this.serializeAirlines(airlines);
    this.shortCitiesList = this.createShortCitiesList(this.cities);
    return response;
  }

  getAirlineByCode(code) {
    return this.airliners[code].name ? this.airliners[code].name : "";
  }
  getAirlineLogoByCode(code) {
    return this.airliners[code].logo ? this.airliners[code].logo : "";
  }

  getCityNameByCode(code) {
    return this.cities[code].name;
  }

  getCityCodeByKey(name) {
    const city = Object.values(this.cities).find((city) => {
      return city.fullName === name;
    });
    return city.code;
  }

  createShortCitiesList(cities) {
    return Object.values(cities).reduce((acc, city) => {
      acc[city.fullName] = null;
      return acc;
    }, {});
  }

  serializeAirlines(airlines) {
    return airlines.reduce((acc, item) => {
      item.logo = `http://pics.avs.io/200/200/${item.code}.png`;
      item.name = item.name || item.name_translations.en;
      acc[item.code] = item;
      return acc;
    }, {});
  }

  serializeCountries(countries) {
    return countries.reduce((acc, country) => {
      acc[country.code] = country;
      return acc;
    }, {});
  }

  serializeCities(cities) {
    return cities.reduce((acc, city) => {
      const countryName = this.countries[city.country_code].name;
      city.name = city.name || city.name_translations.en;
      const fullName = `${city.name},${countryName}`;
      acc[city.code] = {
        ...city,
        countryName,
        fullName,
      };
      return acc;
    }, {});
  }

  getCitiesByCountryCode(code) {
    return Object.values(this.cities).filter((city) => {
      return city.country_code === code;
    });
  }

  getCountryNameByCode(code) {
    return this.countries[code].name;
  }

  async fetchTickets(params) {
    const response = await this.api.prices(params);
    this.lastSeacrh = this.serializeTickets(response.data);
    console.log(this.lastSeacrh);
  }

  serializeTickets(tickets) {
    return Object.values(tickets).map((ticket) => {
      return {
        ...ticket,
        origin_name: this.getCityNameByCode(ticket.origin),
        destination_name: this.getCityNameByCode(ticket.destination),
        airline_logo: this.getAirlineLogoByCode(ticket.airline),
        airline_name: this.getAirlineByCode(ticket.airline),
        departure_at: this.formatDate(ticket.departure_at, "dd MMM yyyy hh:mm"  ),
        return_at: this.formatDate(ticket.return_at, "dd MMM yyyy hh:mm"  ),
        id: uuidv4(),
      };
    });
  }


}

const locations = new Locations(api, { formatDate });

export default locations;
