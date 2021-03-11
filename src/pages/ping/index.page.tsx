import { GetServerSideProps } from 'next';
import React from 'react';

const Ping: React.FC = () => null;

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.end('pong');
  return { props: {} };
};

export default Ping;
