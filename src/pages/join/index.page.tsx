import React from 'react';

import { AuthPage } from '@/components/Auth';
import { JOIN } from '@/utils/routes';
import withAuth from '@/utils/withAuth';

function JoinPage(): JSX.Element {
  return (
    <AuthPage page={JOIN} />
  );
}

export default withAuth(JoinPage, false);
