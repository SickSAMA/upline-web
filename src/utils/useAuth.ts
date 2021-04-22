import { useEffect, useState } from 'react';

import { getSession } from './auth';

// cache the login state. The state is cache thought app's lifecycle.
let _isLogin = false;
let _hasLoginChecked = false;

export default function useAuth(): [boolean, boolean] {
  const [isLogin, setIsLogin] = useState(_isLogin);
  const [loading, setLoading] = useState(!_hasLoginChecked);

  useEffect(() => {
    const loadSession = async () => {
      try {
        await getSession();
        setIsLogin(true);
        _isLogin = true;
      } catch (_) {
        setIsLogin(false);
        _isLogin = false;
      } finally {
        setLoading(false);
        _hasLoginChecked = true;
      }
    };
    if (!_hasLoginChecked) {
      loadSession();
    }
  }, [setIsLogin, setLoading]);

  return [isLogin, loading];
}
