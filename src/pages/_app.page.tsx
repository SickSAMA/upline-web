import '@/styles/globals.scss';

import { ApolloProvider } from '@apollo/client';
import type { AppProps /* , AppContext */ } from 'next/app';
import React from 'react';

import { initializeApollo } from '@/utils/apolloClient';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const apolloClient = initializeApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default MyApp;
