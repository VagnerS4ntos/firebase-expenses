import React from 'react';
import { store, deleteExpense } from '../globalStates/store';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/apiConfig';

function DeleteExpense() {
  const globalState = useSelector((state) => state);

  function cancelDeleteExpense(event) {
    event.preventDefault();
    if (event.target.dataset.function === 'close') {
      store.dispatch(deleteExpense(false));
    }
  }

  async function deleteCurrentExpense(event) {
    event.preventDefault();
    try {
      await deleteDoc(doc(db, 'allExpenses', globalState.currentExpenseId));
      toast.success('Expense successfully deleted.');
      store.dispatch(deleteExpense(false));
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <div
        className="grid place-content-center h-full w-full fixed inset-0 bg-opacity-70 bg-black z-50"
        data-function="close"
        onClick={cancelDeleteExpense}
      >
        <div className="bg-green-600 p-5 rounded-md text-center text-white font-semibold popUp w-60">
          <h2 className="uppercase mb-4">Delete Expense?</h2>

          <form className="space-y-3" onSubmit={deleteCurrentExpense}>
            <div className="grid grid-cols-2 gap-2">
              <button
                className="btn bg-red-500 px-2 py-1 rounded-md uppercase hover:bg-red-600"
                onClick={deleteCurrentExpense}
              >
                Yes
              </button>
              <button
                className="btn bg-blue-500 px-2 py-1 rounded-md uppercase hover:bg-blue-600"
                data-function="close"
              >
                No
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default DeleteExpense;
