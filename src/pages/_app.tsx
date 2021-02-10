import React from 'react';
import '@/styles/globals.scss';
import type { AppProps /* , AppContext */ } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { initializeApollo } from '@/libs/apolloClient';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const apolloClient = initializeApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default MyApp;
