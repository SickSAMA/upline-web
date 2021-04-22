import { ApolloError } from '@apollo/client';

// get from https://www.apollographql.com/docs/apollo-server/data/errors/#error-codes
type ErrorCode = 'GRAPHQL_PARSE_FAILED' | 'GRAPHQL_VALIDATION_FAILED' | 'BAD_USER_INPUT' |
  'UNAUTHENTICATED' | 'FORBIDDEN' | 'PERSISTED_QUERY_NOT_FOUND' | 'PERSISTED_QUERY_NOT_SUPPORTED' |
  'INTERNAL_SERVER_ERROR';

/**
 * Check whether any of the passed error code is included in the Apollo Error object
 * @param error
 * @param code
 */
export function checkErrorCode(error: ApolloError | undefined, code: ErrorCode | ErrorCode[]): boolean {
  const _code = Array.isArray(code) ? code : [code];
  return !!(error?.graphQLErrors?.some((err) => _code.includes(err.extensions?.code)));
}
