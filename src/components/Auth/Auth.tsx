import React, { useCallback, useState } from 'react';

import { JOIN, LOGIN, RESET_PASSWORD } from '@/utils/routes';

import Join from './Join';
import Login from './Login';
import ResetPassword from './ResetPassword';

export type Page = typeof JOIN | typeof LOGIN | typeof RESET_PASSWORD;

interface AuthProps {
  page: Page;
  mode?: 'single-page' | 'multi-page';
  className?: string;
}

export default function Auth({ page, mode = 'multi-page', className }: AuthProps): JSX.Element {
  const [currentPage, setCurrentPage] = useState(page);

  const onLoginClicked = useCallback(() => {
    setCurrentPage(LOGIN);
  }, [setCurrentPage]);

  const onJoinClicked = useCallback(() => {
    setCurrentPage(JOIN);
  }, [setCurrentPage]);

  const onResetPasswordClicked = useCallback(() => {
    setCurrentPage(RESET_PASSWORD);
  }, [setCurrentPage]);

  let renderedPage: JSX.Element;
  if (mode === 'multi-page') {
    if (currentPage === JOIN) {
      renderedPage = <Join />;
    } else if (currentPage === LOGIN) {
      renderedPage = <Login />;
    } else {
      renderedPage = <ResetPassword />;
    }
  } else {
    if (currentPage === JOIN) {
      renderedPage = <Join onLoginClicked={onLoginClicked} />;
    } else if (currentPage === LOGIN) {
      renderedPage = <Login onJoinClicked={onJoinClicked} onResetPasswordClicked={onResetPasswordClicked} />;
    } else {
      renderedPage = <ResetPassword onJoinClicked={onJoinClicked} onLoginClicked={onLoginClicked} />;
    }
  }

  return (
    <div className={className}>
      { renderedPage }
    </div>
  );
}
