import { createStore } from 'redux';
const monthsOfYear = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const GET_ALL_EXPENSES = 'getAllExpenses';
const GET_ALL_USER_EXPENSES = 'getAllUserExpenses';

export function getAllExpensesData(data) {
  return { type: GET_ALL_EXPENSES, payload: data };
}

export function getAllRenderExpenses(data) {
  return { type: GET_ALL_USER_EXPENSES, payload: data };
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
  month: new Date().getMonth(),
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
    default:
      return state;
  }
}
