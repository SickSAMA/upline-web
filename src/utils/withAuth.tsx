import { useRouter } from 'next/router';
import React, { ComponentType } from 'react';

import { LOGIN } from './routes';
import useAuth from './useAuth';

/**
 *
 * @param WrappedComponent
 * @param isLoginRequired  true means redirect on not login in, false means redirect on login
 * @param redirectPath
 * @returns
 */
export default function withAuth(
    WrappedComponent: ComponentType,
): ComponentType {
  function RenderedComponent(props: any): JSX.Element | null { // eslint-disable-line
    const [isLogin, loading] = useAuth();
    const router = useRouter();

    if (loading) {
      return null;
    }

    if (isLogin) {
      return (
        <WrappedComponent {...props} />
      );
    } else {
      router.push(`${LOGIN}?redirect=${router.asPath}`);
      return null;
    }
  }

  return RenderedComponent;
}
