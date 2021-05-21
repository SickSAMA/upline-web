/* eslint-disable  */

import { ApolloError } from "@apollo/client";

/**
 * This function is used specifically to parse error of type 'any' 
 * @param err 
 * @returns 
 */
export function parseAnyError(err: any): string {
  return err.message || JSON.stringify(err);
}


export function parseApolloError(err: ApolloError | undefined): string {
  return err?.message || ''; 
}
