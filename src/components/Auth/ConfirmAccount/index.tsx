import React, { useCallback, useState } from 'react';

import ProvideUsername from './ProvideUsername';
import VerifyCode, { UserData } from './VerifyCode';

type Page = 'PROVIDE_USERNAME' | 'VERIFY_CODE';

interface ConfirmAccountProps {
  onAccountConfirmed(): void;
  userData?: UserData;
}

export default function ConfirmAccount({ onAccountConfirmed, userData: initialUserData }: ConfirmAccountProps): JSX.Element {
  const [page, setPage] = useState<Page>(initialUserData ? 'VERIFY_CODE' : 'PROVIDE_USERNAME');
  const [userData, setUserData] = useState<UserData | undefined>(initialUserData);

  const onCodeSent = useCallback((username) => {
    setPage('VERIFY_CODE');
    setUserData({
      username,
    });
  }, [setUserData, setPage]);

  if (page === 'PROVIDE_USERNAME') {
    return <ProvideUsername onCodeSent={onCodeSent} />;
  } else {
    return <VerifyCode userData={userData} onAccountConfirmed={onAccountConfirmed} />;
  }
}
