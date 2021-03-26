import React from 'react';

import { AuthPage } from '@/components/Auth';
import { LOGIN } from '@/utils/routes';

export default function JoinPage(): JSX.Element {
  return (
    <AuthPage page={LOGIN} />
  );
}
