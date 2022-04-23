import React from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/apiConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

function ResetPassword() {
  const [email, setEmail] = React.useState('');
  const [reset, setReset] = React.useState(false);

  async function resetPassword(event) {
    event.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Check your email!');
      setEmail('');
      setReset(true);
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <main className="flex justify-center px-2 min-h-screen bg-gray-800 pt-32 text-white">
      <section className="text-center mt-10">
        {reset ? (
          <>
            <h1 className="text-2xl">E-mail has been sent!</h1>
            <h2 className="text-xl mb-5">Please, check your e-mail inbox.</h2>
            <Link href="/">
              <a className="bg-green-500 px-2 py-1 rounded-md text-xl hover:bg-green-600">
                Login
              </a>
            </Link>
          </>
        ) : (
          <>
            <h1 className="text-2xl w-full">RESET PASSWORD</h1>
            <form className="w-72 h-fit mt-5" onSubmit={resetPassword}>
              <input
                type="text"
                placeholder="E-mail..."
                className="w-full rounded-md px-2 py-1 text-black"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
              />
              <button className="bg-green-500 w-full rounded-md mt-5 py-1 hover:bg-green-600">
                Reset
              </button>
            </form>
          </>
        )}
      </section>
    </main>
  );
}

export default ResetPassword;

export const getServerSideProps = async (context) => {
  const userID = context.req.cookies['userID'];

  if (userID) {
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
