import React from 'react';
import { monthsOfYear, meses } from '../helpers/functions';
import { useSelector } from 'react-redux';
import { store, getMonth, getYear } from '../globalStates/store';

function SelectDate() {
  const globalState = useSelector((state) => state);
  function getExpenseYear({ target }) {
    store.dispatch(getYear(target.value));
  }

  function getExpenseMonth({ target }) {
    store.dispatch(getMonth(target.value));
  }

  return (
    <div className="text-black flex justify-center gap-5 mt-10">
      <select
        value={globalState.month}
        onChange={getExpenseMonth}
        className="text-xl px-2 rounded-md"
      >
        {monthsOfYear.map((month, index) => (
          <option key={month} value={month}>
            {meses[index]}
          </option>
        ))}
      </select>
      <select
        value={globalState.year}
        onChange={getExpenseYear}
        className="text-xl px-2 rounded-md"
      >
        <option value="2021">2021</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
      </select>
    </div>
  );
}

export default SelectDate;
