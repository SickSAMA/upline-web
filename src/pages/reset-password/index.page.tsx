import React from 'react';

import { AuthPage } from '@/components/Auth';
import { RESET_PASSWORD } from '@/utils/routes';

export default function JoinPage(): JSX.Element {
  return (
    <AuthPage page={RESET_PASSWORD} />
  );
}
