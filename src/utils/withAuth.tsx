import { useRouter } from 'next/router';
import React, { ComponentType, useEffect, useState } from 'react';

import { getSession } from './auth';
import { HOME, LOGIN } from './routes';

/**
 *
 * @param WrappedComponent
 * @param isLoginRequired  true means redirect on not login in, false means redirect on login
 * @param redirectPath
 * @returns
 */
export default function withAuth(
    WrappedComponent: ComponentType,
    isLoginRequired = true,
): ComponentType {
  function RenderedComponent(props: any): JSX.Element | null { // eslint-disable-line
    const [shouldRender, setShouldRender] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const checkSession = async (): Promise<void> => {
        try {
          await getSession();
          if (!isLoginRequired) {
            router.push(HOME);
          } else {
            setShouldRender(true);
          }
        } catch (_) {
          if (isLoginRequired) {
            router.push(LOGIN);
          } else {
            setShouldRender(true);
          }
        }
      };

      checkSession();
    }, [router, setShouldRender]);

    if (!shouldRender) {
      return null;
    } else {
      return (
        <WrappedComponent {...props} />
      );
    }
  }

  return RenderedComponent;
}
