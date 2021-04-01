import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';

import { CONFIRM_ACCOUNT, JOIN, LOGIN, RESET_PASSWORD } from '@/utils/routes';

import ConfirmAccount from './ConfirmAccount';
import { UserData } from './ConfirmAccount/VerifyCode';
import ForgotPassword from './ForgotPassword';
import Join from './Join';
import Login from './Login';

export type Page = typeof JOIN | typeof LOGIN | typeof RESET_PASSWORD | typeof CONFIRM_ACCOUNT;

interface AuthProps {
  page: Page;
  mode?: 'single-page' | 'multi-page'; // 'single-page' means modal mode, 'multi-page' means each page has its own path
  className?: string;
}

export default function Auth({ page, mode = 'multi-page', className }: AuthProps): JSX.Element {
  const [currentPage, setCurrentPage] = useState(page);
  const [userData, setUserData] = useState<UserData>();
  const router = useRouter();

  const onLoginClicked = useCallback(() => {
    if (mode === 'multi-page') {
      router.push(LOGIN);
    } else {
      setCurrentPage(LOGIN);
    }
  }, [setCurrentPage, router, mode]);

  const onJoinClicked = useCallback(() => {
    if (mode === 'multi-page') {
      router.push(JOIN);
    } else {
      setCurrentPage(JOIN);
    }
  }, [setCurrentPage, router, mode]);

  const onForgotPassword = useCallback(() => {
    if (mode === 'multi-page') {
      router.push(RESET_PASSWORD);
    } else {
      setCurrentPage(RESET_PASSWORD);
    }
  }, [setCurrentPage, router, mode]);

  const onConfirmAccount = useCallback(() => {
    if (mode === 'multi-page') {
      router.push(CONFIRM_ACCOUNT);
    } else {
      setCurrentPage(CONFIRM_ACCOUNT);
    }
  }, [setCurrentPage, router, mode]);

  const onSignUpSuccess = useCallback((username: string, password: string) => {
    setUserData({
      username,
      password,
    });
    setCurrentPage(CONFIRM_ACCOUNT);
  }, [setCurrentPage, setUserData]);

  const onAccountConfirmed = useCallback(async () => {
    if (mode === 'multi-page') {
      router.push(LOGIN);
    } else {
      setCurrentPage(LOGIN);
    }
  }, [setCurrentPage, router, mode]);

  let renderedPage: JSX.Element;

  if (currentPage === JOIN) {
    if (mode === 'multi-page') {
      renderedPage = <Join onSignUpSuccess={onSignUpSuccess} />;
    } else {
      renderedPage = <Join onLoginClicked={onLoginClicked} onSignUpSuccess={onSignUpSuccess} />;
    }
  } else if (currentPage === LOGIN) {
    renderedPage = <Login onJoinClicked={onJoinClicked} onForgotPassword={onForgotPassword} onConfirmAccount={onConfirmAccount} />;
  } else if (currentPage === RESET_PASSWORD) {
    renderedPage = <ForgotPassword onJoinClicked={onJoinClicked} onLoginClicked={onLoginClicked} />;
  } else {
    renderedPage = <ConfirmAccount userData={userData} onAccountConfirmed={onAccountConfirmed} />;
  }

  return (
    <div className={className}>
      { renderedPage }
    </div>
  );
}
