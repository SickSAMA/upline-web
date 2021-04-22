import { NextRouter } from 'next/router';

export default function getRouterQueryValue(router: NextRouter, key: string): string | undefined {
  const value = router.query[key];
  if (value) {
    if (Array.isArray(value)) {
      if (value.length > 0) {
        return value[0];
      } else {
        return undefined;
      }
    } else {
      return value;
    }
  }
  return undefined;
}
