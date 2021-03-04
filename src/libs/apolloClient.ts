import { ApolloClient, createHttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { CognitoUserSession } from 'amazon-cognito-identity-js';

import { getCurrentUser } from '@/libs/auth';

let apolloClient: ApolloClient<NormalizedCacheObject>;

/**
 * Create customFetch function for handling re-authentication.
 * All auth work is done by amazon-cognito-identity-js.
 */
const customFetch = async (uri: RequestInfo, options?: RequestInit):Promise<Response> => {
  const currentUser = getCurrentUser();
  const _options: RequestInit = options || {};

  if (currentUser) {
    currentUser.getSession((error: Error | null, session: CognitoUserSession | null) => {
      if (error) {
        console.error(error);
        return;
      }

      const jwtToken = (session as CognitoUserSession).getIdToken().getJwtToken();

      if (!_options.headers) {
        _options.headers = {};
      }
      _options.headers['authorization'] = `Bearer ${jwtToken}`;
    });
  }

  return fetch(uri, _options);
};


export function createApolloClient(): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // set to true for SSR
    link: createHttpLink({
      uri: `${process.env.NEXT_PUBLIC_API_ENDPOINT}`,
      fetch: customFetch,
    }),
    cache: new InMemoryCache(),
  });
}

/**
 * On client side, only one ApolloClient instance is created,
 * On server side, a new ApolloClient instance is created for every call.
 */
export function initializeApollo(initialState: NormalizedCacheObject | undefined): ApolloClient<NormalizedCacheObject> {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') {
    return _apolloClient;
  }

  // Create the Apollo Client once in the client
  if (!apolloClient) {
    apolloClient = _apolloClient;
  }

  return _apolloClient;
}
