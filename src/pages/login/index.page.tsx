import React from 'react';

import { AuthPage } from '@/components/Auth';
import { LOGIN } from '@/utils/routes';
import withAuth from '@/utils/withAuth';

function LoginPage(): JSX.Element {
  return (
    <AuthPage page={LOGIN} />
  );
}

export default withAuth(LoginPage, false);
