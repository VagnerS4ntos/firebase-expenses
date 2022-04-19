import React from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  store,
  getAllExpensesData,
  getAllRenderExpenses,
  startLoading,
  stopLoading,
} from '../globalStates/store';
import { db } from '../firebase/apiConfig';
import { collection, getDocs } from 'firebase/firestore';
import { capitalizeFirstLetter } from '../helpers/functions';

function Expenses() {
  const globalState = useSelector((state) => state);

  React.useEffect(() => {
    async function getExpenses() {
      store.dispatch(startLoading());
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
  }, []);

  return (
    <main className="px-2 pt-32 bg-gray-800 text-white min-h-screen">
      <section className="container mx-auto">
        {globalState.loading ? (
          <h1 className="mt-10">Loading...</h1>
        ) : (
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
              {globalState.allExpenses.map((expense) => {
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
                      {expense.value}
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
