import React from 'react';
import { GetServerSideProps } from 'next';

const Ping: React.FC = () => null;

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.end('pong');
  return { props: {} };
};

export default Ping;
