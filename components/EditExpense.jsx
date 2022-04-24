import React from 'react';
import { store, editExpense } from '../globalStates/store';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/apiConfig';
import { useSelector } from 'react-redux';
import { validateExpenseValue } from '../helpers/functions';

function EditExpense({ currentExpenseEditing }) {
  const [expenseName, setExpenseName] = React.useState('');
  const [expenseType, setExpenseType] = React.useState('');
  const [expenseValue, setExpenseValue] = React.useState('');
  const globalState = useSelector((state) => state);

  function cancelEditExpense(event) {
    event.preventDefault();
    if (event.target.dataset.function === 'close') {
      store.dispatch(editExpense(false));
    }
  }

  async function saveNewExpense(event) {
    event.preventDefault();
    try {
      if (expenseName === '') {
        toast.error('Nome inválido.');
      } else if (expenseType === '') {
        toast.error('Tipo inválido.');
      } else if (expenseValue === '') {
        toast.error('Valor inválido.');
      } else {
        const id = globalState.currentExpenseId;
        const newValue = validateExpenseValue(expenseValue, expenseType);

        await updateDoc(doc(db, 'allExpenses', id), {
          name: expenseName,
          type: expenseType,
          value: newValue,
        });
        toast.success('Despesa alterada com sucesso.');
        store.dispatch(editExpense(false));
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  React.useEffect(() => {
    setExpenseName(currentExpenseEditing.name);
    setExpenseType(currentExpenseEditing.type);
    setExpenseValue(currentExpenseEditing.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalState.editExpense]);

  return (
    <>
      <div
        className="grid place-content-center h-full w-full fixed inset-0 bg-opacity-70 bg-black z-50"
        data-function="close"
        onClick={cancelEditExpense}
      >
        <div className="bg-green-600 p-5 rounded-md text-center text-white font-semibold popUp w-60">
          <h2 className="uppercase mb-4">Editar despesa</h2>

          <form className="space-y-3" onSubmit={saveNewExpense}>
            <div className="space-x-2 text-left">
              <input
                type="text"
                className="text-black p-1 rounded-sm w-full"
                placeholder="Nome..."
                value={expenseName}
                onChange={({ target }) => setExpenseName(target.value)}
              />
            </div>
            <div className="space-x-2 text-left">
              <select
                className="text-black rounded-sm p-1 w-full"
                value={expenseType}
                onChange={({ target }) => setExpenseType(target.value)}
              >
                <option value="" disabled>
                  Selecione o tipo
                </option>
                <option value="income">Saída</option>
                <option value="expense">Entrada</option>
              </select>
            </div>
            <div className="space-x-2 text-left">
              <input
                type="number"
                className="text-black p-1 rounded-sm w-full"
                placeholder="Valor..."
                value={expenseValue}
                onChange={({ target }) => setExpenseValue(target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                className="btn bg-blue-500 px-2 py-1 rounded-md uppercase hover:bg-blue-600"
                onClick={saveNewExpense}
              >
                Salvar
              </button>
              <button
                className="btn bg-yellow-500 px-2 py-1 rounded-md uppercase hover:bg-yellow-600"
                data-function="close"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditExpense;
