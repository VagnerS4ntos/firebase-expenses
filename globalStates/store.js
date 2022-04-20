import { createStore } from 'redux';
import { monthsOfYear } from '../helpers/functions';

const GET_ALL_EXPENSES = 'getAllExpenses';
const GET_ALL_USER_EXPENSES = 'getAllUserExpenses';
const START_LOADING = 'startLoading';
const STOP_LOADING = 'stopLoading';
const GET_YEAR = 'getYear';
const GET_MONTH = 'getMonth';

export function getAllExpensesData(data) {
  return { type: GET_ALL_EXPENSES, payload: data };
}

export function getAllRenderExpenses(data) {
  return { type: GET_ALL_USER_EXPENSES, payload: data };
}

export function startLoading() {
  return { type: START_LOADING };
}

export function stopLoading() {
  return { type: STOP_LOADING };
}

export function getYear(year) {
  return { type: GET_YEAR, payload: year };
}

export function getMonth(month) {
  return { type: GET_MONTH, payload: month };
}

const initialState = {
  allExpenses: [],
  expensesOnScreen: [],
  createExpense: false,
  deleteExpense: false,
  currentExpenseId: '',
  editExpense: false,
  loading: true,
  year: new Date().getFullYear(),
  month: monthsOfYear[new Date().getMonth()],
  balance: { totalExpense: 0, totalIncome: 0, finalBalance: 0 },
  deleteUser: { status: false, userId: '' },
};

export const store = createStore(rootReducer);
export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_EXPENSES:
      return { ...state, allExpenses: action.payload };
    case GET_ALL_USER_EXPENSES:
      return { ...state, expensesOnScreen: action.payload };
    case START_LOADING:
      return { ...state, loading: true };
    case STOP_LOADING:
      return { ...state, loading: false };
    case GET_YEAR:
      return { ...state, year: action.payload };
    case GET_MONTH:
      return { ...state, month: action.payload };
    default:
      return state;
  }
}
