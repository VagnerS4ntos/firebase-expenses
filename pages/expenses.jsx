import React from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  store,
  getAllExpensesData,
  getAllRenderExpenses,
  stopLoading,
  createExpense,
} from '../globalStates/store';
import { db } from '../firebase/apiConfig';
import { collection, getDocs } from 'firebase/firestore';
import { capitalizeFirstLetter } from '../helpers/functions';
import SelectDate from '../components/SelectDate';
import { monthsOfYear, numberToCurrency } from '../helpers/functions';
import { auth } from '../firebase/apiConfig';
import NewExpense from '../components/NewExpense';

function Expenses() {
  const globalState = useSelector((state) => state);

  //GET ALL EXPENSES
  React.useEffect(() => {
    async function getExpenses() {
      try {
        const data = await getDocs(collection(db, 'allExpenses'));
        const expenses = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        expenses.forEach(
          (item) => (item.date = new Date(item.date.seconds * 1000)),
        );
        store.dispatch(getAllExpensesData(expenses));
      } catch (error) {
        toast.error(error.message);
      }
      store.dispatch(stopLoading());
    }
    getExpenses();
  }, [globalState.createExpense]);

  //GET EXPENSES TO RENDER
  React.useEffect(() => {
    const dataOnScreen = globalState.allExpenses.filter(
      (expense) =>
        expense.user === auth.currentUser.uid &&
        monthsOfYear[expense.date.getMonth()] === globalState.month &&
        expense.date.getFullYear() == globalState.year,
    );
    store.dispatch(getAllRenderExpenses(dataOnScreen));
  }, [globalState.allExpenses, globalState.month, globalState.year]);

  if (globalState.loading) {
    return (
      <main className="bg-gray-800 min-h-screen text-white pt-32">
        <div className="container mx-auto">
          <h1 className="mt-10">Loading...</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="px-2 pt-32 bg-gray-800 text-white min-h-screen">
      {globalState.createExpense && <NewExpense />}

      <section className="container mx-auto">
        <SelectDate />
        <button
          className="bg-green-600 px-2 py-1 rounded hover:bg-green-700 mt-10"
          onClick={() => store.dispatch(createExpense(true))}
        >
          New Expense
        </button>

        {globalState.expensesOnScreen.length ? (
          <table className="border-separate border border-white w-full mx-auto mt-10">
            <thead>
              <tr className="text-left bg-gray-300 text-black">
                <th className="border borderwhite px-2">NAME</th>
                <th className="border borderwhite px-2">VALUE</th>
                <th className="border borderwhite px-2 w-24 text-center">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              {globalState.expensesOnScreen.map((expense) => {
                return (
                  <tr key={expense.id}>
                    <td className="border border-white p-2">
                      {capitalizeFirstLetter(expense.name)}
                    </td>
                    <td
                      className={`border border-white p-2 ${
                        expense.value < 0 ? 'text-red-500' : 'text-green-500'
                      }`}
                    >
                      {numberToCurrency(expense.value)}
                    </td>
                    <td className="border border-white p-2">
                      <div className="flex justify-center gap-2 text-xl">
                        <MdDelete className="cursor-pointer text-red-500" />
                        <MdEdit className="cursor-pointer" />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <h1 className="mt-10">No data found...</h1>
        )}
      </section>
    </main>
  );
}

export default Expenses;

export const getServerSideProps = async (context) => {
  const userID = context.req.cookies['userID'];

  if (!userID) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
