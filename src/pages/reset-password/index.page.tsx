import React from 'react';

import { AuthPage } from '@/components/Auth';
import { RESET_PASSWORD } from '@/utils/routes';
import withAuth from '@/utils/withAuth';

function ResetPasswordPage(): JSX.Element {
  return (
    <AuthPage page={RESET_PASSWORD} />
  );
}

export default withAuth(ResetPasswordPage, false);
