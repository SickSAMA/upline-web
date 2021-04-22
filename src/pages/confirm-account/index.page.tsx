import React from 'react';

import { AuthPage } from '@/components/Auth';
import { CONFIRM_ACCOUNT } from '@/utils/routes';

export default function ConfirmAccountPage(): JSX.Element {
  return (
    <AuthPage page={CONFIRM_ACCOUNT} />
  );
}
