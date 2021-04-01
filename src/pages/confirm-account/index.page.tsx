import React from 'react';

import { AuthPage } from '@/components/Auth';
import { CONFIRM_ACCOUNT } from '@/utils/routes';
import withAuth from '@/utils/withAuth';

function ConfirmAccountPage(): JSX.Element {
  return (
    <AuthPage page={CONFIRM_ACCOUNT} />
  );
}

export default withAuth(ConfirmAccountPage, false);
