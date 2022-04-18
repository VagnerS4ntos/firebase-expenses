import React from 'react';

function expenses() {
  return <div>expenses</div>;
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
