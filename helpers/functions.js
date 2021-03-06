export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function numberToCurrency(value) {
  return Number(value).toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function validateExpenseValue(value, type) {
  let validValue = 0;
  if (type === 'expense' && value > 0) {
    validValue = -1 * Number(value);
  } else if (type === 'income' && value < 0) {
    validValue = -1 * Number(value);
  } else {
    validValue = value;
  }
  return validValue;
}

export function getNewDate(year, indexMonth) {
  const newDate = new Date(year, indexMonth);
  return newDate;
}

export function getFinalBalance(allData, type) {
  const balanceItems = allData.filter((item) => item.type === type);
  const balanceTotal = balanceItems.reduce((acc, item) => {
    return Number(acc) + Number(item.value);
  }, 0);

  return balanceTotal;
}

export const monthsOfYear = [
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

export const meses = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];
