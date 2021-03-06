import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { MdPerson } from 'react-icons/md';
import { auth } from '../firebase/apiConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setCookies } from 'cookies-next';
import { useRouter } from 'next/router';
import Spinning from '../components/Spinning';
import { store, userLogged } from '../globalStates/store';

export default function Home() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const router = useRouter();
  const [makingLoging, setMakingLogin] = React.useState(false);

  async function login(event) {
    event.preventDefault();
    try {
      if (email === '') {
        toast.error('E-mail inválido.');
      } else if (password === '') {
        toast.error('Senha inválida.');
      } else {
        setMakingLogin(true);
        await signInWithEmailAndPassword(auth, email, password);
        setCookies('userID', auth.currentUser.uid, {
          maxAge: 3600, // Will expire after 1hr (value is in number of sec.)
        });
        store.dispatch(userLogged(true));
        router.push('/expenses');
      }
    } catch (error) {
      toast.error(error.message);
      setMakingLogin(false);
    }
  }

  return (
    <>
      <Head>
        <title>Receitas e Despesas - Login</title>
      </Head>

      <main className="grid place-items-center px-2 min-h-screen bg-gray-800 pt-32">
        <div className="p-5 bg-gray-300 rounded-md ">
          <div className="bg-gray-500 w-20 h-20 mx-auto mb-5 rounded-full grid place-items-center">
            <MdPerson className="text-5xl" />
          </div>
          <form className="text-black" onSubmit={login}>
            <div className="flex flex-col gap-1">
              <input
                type="text"
                className="px-2 py-1 rounded-md"
                placeholder="E-mail..."
                value={email}
                onChange={({ target }) => setEmail(target.value)}
              />
            </div>
            <div className="flex flex-col gap-1 mt-5">
              <input
                type="password"
                className="px-2 py-1 rounded-md"
                placeholder="Senha..."
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>

            <button className="bg-blue-400 uppercase font-semibold px-4 py-1 mt-5 rounded-md w-full hover:bg-blue-500 text-center text-white">
              {makingLoging ? (
                <Spinning title="Carregando" width="w-5" height="h-5" />
              ) : (
                'Login'
              )}
            </button>

            <Link href="/resetPassword" passHref>
              <p className="mt-2 text-sm">
                Esqueceu a senha?{' '}
                <a className="text-red-500 cursor-pointer font-semibold">
                  Resetar
                </a>
              </p>
            </Link>

            <Link href="/createAccount" passHref>
              <p className="mt-2 text-sm">
                Não tem uma conta?{' '}
                <a className="text-red-500 cursor-pointer font-semibold">
                  Registrar-se
                </a>
              </p>
            </Link>
          </form>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const userID = context.req.cookies['userID'];

  if (userID) {
    return {
      redirect: {
        destination: '/expenses',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
