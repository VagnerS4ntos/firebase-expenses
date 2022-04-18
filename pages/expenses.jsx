import React from 'react';

function expenses() {
  return (
    <main className="container mx-auto px-2 pt-32">
      <h1>EXPENSES</h1>
    </main>
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
