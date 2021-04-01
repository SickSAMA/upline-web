/* eslint-disable  */
/**
 * This function is used specifically to parse error of type 'any' 
 * @param err 
 * @returns 
 */
export default function parseError(err: any): string {
  return err.message || JSON.stringify(err);
}
