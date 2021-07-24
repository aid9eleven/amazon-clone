import countries from './countries.json'
import { shuffle } from './util';
import products from './products.json'

export const initialState = {
  initCount: 0,
  user: null,
  cart: [],
  purchases: [],
  isSidebarOpen: false,
  isCountrySelectorOpen: false,
  country: countries.find(country => country.name==="Philippines"),
  allProducts: shuffle(products),
  topSellers: shuffle(products.filter(product => product.rating>=4.8))
};

export const action = {
  INITIALIZE: "INITIALIZE",
  SET_USER: "SET_USER",
  SET_CART: "SET_CART",
  SET_PURCHASES: "SET_PURCHASES",
  OPEN_SIDEBAR: "OPEN_SIDEBAR",
  OPEN_COUNTRY_SELECTOR: "OPEN_COUNTRY_SELECTOR",
  SET_COUNTRY: "SET_COUNTRY",
}

const reducer = (state, action) => {
  // console.log(action);
  switch (action.type) {
    case 'INITIALIZE':
      return {
        ...state,
        initCount: action.initCount
      }
    case 'SET_USER':
      return {
        ...state,
        user: action.user
      }
    case 'SET_CART':
      return {
        ...state,
        cart: action.cart
      }
    case 'SET_PURCHASES':
      return {
        ...state,
        purchases: action.purchases
      }
    case 'OPEN_SIDEBAR':
      return {
        ...state,
        isSidebarOpen: action.isSidebarOpen
      }
    case 'OPEN_COUNTRY_SELECTOR':
      return {
        ...state,
        isCountrySelectorOpen: action.isCountrySelectorOpen
      }
    case 'SET_COUNTRY':
      return {
        ...state,
        country: action.country
      }
    default:
      return state;
  }
}

export default reducer;