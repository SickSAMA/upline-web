import React, { MouseEventHandler, useCallback, useState } from 'react';

import { JOIN, LOGIN } from '@/utils/routes';

import style from '../style.module.scss';
import ProvideUsername from './ProvideUsername';
import ResetPassword from './ResetPassword';

type Page = 'PROVIDE_USERNAME' | 'RESET_PASSWORD';

interface ForgotPasswordProps {
  onLoginClicked: MouseEventHandler;
  onJoinClicked: MouseEventHandler;
}

export default function ForgotPassword({ onLoginClicked, onJoinClicked }: ForgotPasswordProps): JSX.Element {
  const [page, setPage] = useState<Page>('PROVIDE_USERNAME');
  const [username, setUsername] = useState<string>();

  const onForgotPassword = useCallback((username) => {
    setPage('RESET_PASSWORD');
    setUsername(username);
  }, [setUsername, setPage]);

  const onChangeUsername = useCallback(() => {
    setPage('PROVIDE_USERNAME');
  }, [setPage]);

  return (
    <div>
      {
        page === 'PROVIDE_USERNAME' ?
          <ProvideUsername onForgotPassword={onForgotPassword} /> :
          <ResetPassword username={username} onChangeUsername={onChangeUsername} />
      }
      <div className={style.jumpLink}>
        <a href={LOGIN} onClick={onLoginClicked}>Return to sign in</a>
        &nbsp;or&nbsp;
        <a href={JOIN} onClick={onJoinClicked}>join now</a>
      </div>
    </div>
  );
}
