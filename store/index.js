export const state = () => ({
  currencies: null,
  own: RUB,
});

export const actions = {
  async fetchCurrency({commit}) {
    try {
      const { Valute } = await this.$axios.$get("https://www.cbr-xml-daily.ru/daily_json.js");

      const currencies = [];
      for(let code in Valute) {
        currencies.push(Valute[code]);
      }
      currencies.push(RUB);

      commit('setCurrencies', currencies);
      return currencies;
    }
    catch (e) {
      throw e;      
    }
  }
};

export const mutations = {
  setCurrencies(state, currencies) {
    state.currencies = currencies;
  },
  setOwnByCharCode(state, charCode) {
    state.own = state.currencies.find((currency) => currency.CharCode === charCode);
  },
};

export const getters = {
  hasCurrencies: state => Boolean(state.currencies),
  currencies: state => state.currencies,
  getOwnCurrency: state => state.own,
};

const RUB = {
    CharCode: "RUB",
    ID: "R00000",
    Name: "Российский рубль",
    Nominal: 1,
    NumCode: "000",
    Value: 1,
    Previous: 1,
  };