import React from 'react';
import { useSelector } from 'react-redux';
import { numberToCurrency } from '../helpers/functions';

function Balance() {
  const globalState = useSelector((state) => state);

  return (
    <div className="mt-10 bg-gray-100 text-black p-2 text-xl font-semibold uppercase rounded-md">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:w-3/5 mx-auto text-center">
        <p>
          Total expense:
          <br />
          <span className="text-red-500">
            {numberToCurrency(globalState.balance.totalExpense)}
          </span>
        </p>
        <p>
          Total income:
          <br />
          <span className="text-green-500">
            {numberToCurrency(globalState.balance.totalIncome)}
          </span>
        </p>
      </div>
      <div className="text-center mt-5">
        <p className="bg-yellow-400 inline-block px-2 font-bold">
          Balance:{' '}
          <span
            className={`${
              globalState.balance.finalBalance < 0
                ? 'text-red-600'
                : 'text-green-600'
            }`}
          >
            {numberToCurrency(globalState.balance.finalBalance)}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Balance;
