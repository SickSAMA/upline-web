/* eslint-disable @typescript-eslint/no-explicit-any */
import cloneDeep from 'lodash/cloneDeep';

/**
 * remove the __typename field from graphql result
 */

type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

type Exclude<T, U> = T extends U ? never : T;

type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

type OmitedTypename<T> = Omit<T, '__typename'>;

interface ApolloResult {
  __typename?: string;
}

export default function omitTypename<T extends ApolloResult>(input: T): OmitedTypename<T> {
  const clone = cloneDeep(input);
  return omitTypenameFromObjectOrArray(clone);
}

function omitTypenameFromObjectOrArray<T extends ApolloResult>(input: T): OmitedTypename<T> {
  if (Array.isArray(input)) {
    input.forEach((i) => omitTypenameFromObjectOrArray(i));
  } else if (typeof input === 'object' && input !== null) {
    delete input.__typename;
    Object.keys(input).forEach((key) => omitTypenameFromObjectOrArray(input[key]));
  }

  return input;
}
