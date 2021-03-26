import { useEffect, useState } from 'react';

export default function useDelayedTrigger(isTriggered: boolean, delay = 300): boolean {
  const [_isTriggered, setIsTriggered] = useState(false);

  useEffect(() => {
    if (isTriggered) {
      const timer = setTimeout(() => {
        setIsTriggered(isTriggered);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setIsTriggered(isTriggered);
    }
  }, [isTriggered, delay]);

  return _isTriggered;
}
