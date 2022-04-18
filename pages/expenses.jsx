import React from 'react';
import { auth } from '../firebase/apiConfig';
import { signOut } from 'firebase/auth';
import { removeCookies } from 'cookies-next';

function expenses() {
  async function logOff() {
    await signOut(auth);
    removeCookies('userID');
  }
  return (
    <button
      className="bg-blue-400 uppercase font-semibold px-4 py-1 mt-5 rounded-md w-60 hover:bg-blue-500"
      onClick={logOff}
    >
      Sign out
    </button>
  );
}

export default expenses;

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
