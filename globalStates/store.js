import { createStore } from 'redux';
import { monthsOfYear } from '../helpers/functions';

export function getAllExpensesData(data) {
  return { type: 'getAllExpenses', payload: data };
}

export function getAllRenderExpenses(data) {
  return { type: 'getAllUserExpenses', payload: data };
}

export function loading(status) {
  return { type: 'loading', payload: status };
}

export function getYear(year) {
  return { type: 'getYear', payload: year };
}

export function getMonth(month) {
  return { type: 'getMonth', payload: month };
}

export function createExpense(status) {
  return { type: 'openNewExpenseWindow', payload: status };
}

export function deleteExpense(status) {
  return { type: 'openDeleteExpenseWindow', payload: status };
}

export function getExpenseId(id) {
  return { type: 'getExpenseId', payload: id };
}

export function editExpense(status) {
  return { type: 'editExpense', payload: status };
}

export function getBalance(balance) {
  return { type: 'getBalance', payload: balance };
}

export function userLogged(status) {
  return { type: 'userLogged', payload: status };
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
  userLogged: false,
};

export const store = createStore(rootReducer);
export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'getAllExpenses':
      return { ...state, allExpenses: action.payload };
    case 'getAllUserExpenses':
      return { ...state, expensesOnScreen: action.payload };
    case 'loading':
      return { ...state, loading: action.payload };
    case 'getYear':
      return { ...state, year: action.payload };
    case 'getMonth':
      return { ...state, month: action.payload };
    case 'openNewExpenseWindow':
      return { ...state, createExpense: action.payload };
    case 'openDeleteExpenseWindow':
      return { ...state, deleteExpense: action.payload };
    case 'getExpenseId':
      return { ...state, currentExpenseId: action.payload };
    case 'editExpense':
      return { ...state, editExpense: action.payload };
    case 'getBalance':
      return { ...state, balance: action.payload };
    case 'userLogged':
      return { ...state, userLogged: action.payload };
    default:
      return state;
  }
}
