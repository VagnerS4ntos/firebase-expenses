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

export default function Home() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const router = useRouter();

  async function login(event) {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setCookies('userID', auth.currentUser.uid, {
        maxAge: 3600, // Will expire after 1hr (value is in number of sec.)
      });
      router.push('/expenses');
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <Head>
        <title>Expenses - Login</title>
      </Head>
      <main className="grid place-items-center px-2 min-h-screen bg-gray-800">
        <div className="p-5 bg-gray-300 rounded-md text-black shadow-lg">
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
                placeholder="Password..."
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>

            <button className="bg-blue-400 uppercase font-semibold px-4 py-1 mt-5 rounded-md w-full hover:bg-blue-500">
              Login
            </button>

            <Link href="/resetPassword" passHref>
              <p className="mt-2 text-sm">
                Forgot password?{' '}
                <a className="text-red-500 cursor-pointer font-semibold">
                  Reset
                </a>
              </p>
            </Link>

            <Link href="/createAccount" passHref>
              <p className="mt-2 text-sm">
                Don&apos;t have an account?{' '}
                <a className="text-red-500 cursor-pointer font-semibold">
                  Sing up
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
