import { useRouter } from 'next/router';
import React, { MouseEventHandler, useCallback, useState } from 'react';

import { CONFIRM_ACCOUNT, JOIN, LOGIN, RESET_PASSWORD } from '@/utils/routes';

import ConfirmAccount from './ConfirmAccount';
import { UserData } from './ConfirmAccount/VerifyCode';
import ForgotPassword from './ForgotPassword';
import Join from './Join';
import Login from './Login';

export type Page = 'join' | 'login' | 'reset_password' | 'confirm_account';

interface AuthProps {
  page: Page;
  mode?: 'single-page' | 'multi-page'; // 'single-page' means modal mode, 'multi-page' means each page has its own path
  className?: string;
  onLoginSuccess?(): void;
}

export default function Auth({ page, mode = 'multi-page', className, onLoginSuccess }: AuthProps): JSX.Element {
  const [currentPage, setCurrentPage] = useState(page);
  const [userData, setUserData] = useState<UserData>();
  const router = useRouter();

  const onLoginClicked: MouseEventHandler = useCallback((e) => {
    e.preventDefault();
    if (mode === 'multi-page') {
      router.push(LOGIN);
    } else {
      setCurrentPage('login');
    }
  }, [setCurrentPage, router, mode]);

  const onJoinClicked: MouseEventHandler = useCallback((e) => {
    e.preventDefault();
    if (mode === 'multi-page') {
      router.push(JOIN);
    } else {
      setCurrentPage('join');
    }
  }, [setCurrentPage, router, mode]);

  const onForgotPassword: MouseEventHandler = useCallback((e) => {
    e.preventDefault();
    if (mode === 'multi-page') {
      router.push(RESET_PASSWORD);
    } else {
      setCurrentPage('reset_password');
    }
  }, [setCurrentPage, router, mode]);

  const onConfirmAccount = useCallback(() => {
    if (mode === 'multi-page') {
      router.push(CONFIRM_ACCOUNT);
    } else {
      setCurrentPage('confirm_account');
    }
  }, [setCurrentPage, router, mode]);

  const onSignUpSuccess = useCallback((username: string, password: string) => {
    setUserData({
      username,
      password,
    });
    setCurrentPage('confirm_account');
  }, [setCurrentPage, setUserData]);

  const onAccountConfirmed = useCallback(async () => {
    if (mode === 'multi-page') {
      router.push(LOGIN);
    } else {
      setCurrentPage('login');
    }
  }, [setCurrentPage, router, mode]);

  let renderedPage: JSX.Element;

  if (currentPage === 'join') {
    renderedPage = <Join onLoginClicked={onLoginClicked} onSignUpSuccess={onSignUpSuccess} />;
  } else if (currentPage === 'login') {
    renderedPage = (
      <Login onJoinClicked={onJoinClicked} onForgotPassword={onForgotPassword} onConfirmAccount={onConfirmAccount} onLoginSuccess={onLoginSuccess} />
    );
  } else if (currentPage === 'reset_password') {
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
