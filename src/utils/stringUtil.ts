export function splitStringByNewline(str: string): string[] {
  return str.split(/\r\n|\r|\n/).filter((s) => s.length > 0);
}
