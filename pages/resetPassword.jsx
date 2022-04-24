import React from 'react';
import Head from 'next/head';
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
      if (email === '') {
        toast.error('E-mail inválido.');
      } else {
        await sendPasswordResetEmail(auth, email);
        toast.success('Cheque seu e-mail!');
        setEmail('');
        setReset(true);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <Head>
        <title>Receitas e Despesas - Resetar senha</title>
      </Head>
      <main className="flex justify-center px-2 min-h-screen bg-gray-800 pt-32 text-white">
        <section className="text-center mt-10">
          {reset ? (
            <>
              <h1 className="text-2xl">Um e-mail foi enviado!</h1>
              <h2 className="text-xl mb-5">
                Por favor, cheque sua caixa de entrada.
              </h2>
              <Link href="/">
                <a className="bg-green-500 px-2 py-1 rounded-md text-xl hover:bg-green-600">
                  Login
                </a>
              </Link>
            </>
          ) : (
            <>
              <h1 className="text-2xl w-full">RESETAR SENHA</h1>
              <form className="w-72 h-fit mt-5" onSubmit={resetPassword}>
                <input
                  type="text"
                  placeholder="E-mail..."
                  className="w-full rounded-md px-2 py-1 text-black"
                  value={email}
                  onChange={({ target }) => setEmail(target.value)}
                />
                <button className="bg-green-500 w-full rounded-md mt-5 py-1 hover:bg-green-600">
                  Resetar
                </button>
              </form>
            </>
          )}
        </section>
      </main>
    </>
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
