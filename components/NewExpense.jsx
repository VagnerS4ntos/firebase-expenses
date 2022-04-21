import React from 'react';
import { store, createExpense } from '../globalStates/store';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NewExpense() {
  const [expenseName, setExpenseName] = React.useState('');
  const [expenseType, setExpenseType] = React.useState('');
  const [expenseValue, setExpenseValue] = React.useState('');

  function cancelCreateExpense(event) {
    event.preventDefault();
    if (event.target.dataset.function === 'close') {
      store.dispatch(createExpense(false));
    }
  }

  async function saveNewExpense(event) {
    event.preventDefault();

    try {
      if (expenseName === '') {
        toast.error('Invalid Expense Name');
      } else if (expenseType === '') {
        toast.error('Invalid Expense Type');
      } else if (expenseValue === '') {
        toast.error('Invalid Expense Value');
      } else {
        console.log('SAVE EXPENSE');
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <div
        className="grid place-content-center h-full w-full fixed inset-0 bg-opacity-70 bg-black z-50"
        data-function="close"
        onClick={cancelCreateExpense}
      >
        <div className="bg-green-600 p-5 rounded-md text-center text-white font-semibold popUp w-60">
          <h2 className="uppercase mb-2">Create Expense</h2>

          <form className="space-y-3" onSubmit={saveNewExpense}>
            <div className="space-x-2 text-left">
              <input
                type="text"
                className="text-black p-1 rounded-sm w-full"
                placeholder="Expense name..."
                value={expenseName}
                onChange={({ target }) => setExpenseName(target.value)}
              />
            </div>
            <div className="space-x-2 text-left">
              <select
                className="text-black rounded-sm p-1 w-full"
                defaultValue={''}
                onChange={({ target }) => setExpenseType(target.value)}
              >
                <option value="" disabled>
                  Select type
                </option>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div className="space-x-2 text-left">
              <input
                type="number"
                className="text-black p-1 rounded-sm w-full"
                placeholder="Expense value..."
                value={expenseValue}
                onChange={({ target }) => setExpenseValue(target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                className="btn bg-blue-500 px-2 py-1 rounded-md uppercase hover:bg-blue-600"
                onClick={saveNewExpense}
              >
                Save
              </button>
              <button
                className="btn bg-yellow-500 px-2 py-1 rounded-md uppercase hover:bg-yellow-600"
                data-function="close"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewExpense;