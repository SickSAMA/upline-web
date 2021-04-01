import { useCallback, useEffect, useState } from 'react';

type Status = 'RUNNING' | 'PAUSED' | 'STOPPED';

interface optionTypes {
  autostart: boolean;
  startTime: number;
  endTime: number;
  interval?: number;
  onTimeOver?(): void;
  onTimeUpdate?(time: number): void;
  step?: number;
  timerType?: 'INC' | 'DEC';
}

interface returnTypes {
  pause: () => void;
  reset: () => void;
  start: () => void;
  status: Status;
  time: number;
}

export default function useTimer({
  autostart = false,
  endTime,
  startTime = 0,
  step = 1,
  interval = 1000,
  onTimeOver,
  onTimeUpdate,
  timerType = 'INC',
}: optionTypes): returnTypes {
  const [status, setStatus] = useState<Status>('STOPPED');
  const [time, setTime] = useState(startTime);

  const pause = useCallback(() => {
    setStatus('PAUSED');
  }, [setStatus]);

  const reset = useCallback(() => {
    setStatus('STOPPED');
    setTime(startTime);
  }, [setStatus, setTime, startTime]);

  const start = useCallback(() => {
    setStatus('RUNNING');
  }, [setStatus]);

  useEffect(() => {
    if (autostart) {
      start();
    }
  }, [start, autostart]);

  useEffect(() => {
    if (typeof onTimeUpdate === 'function') {
      onTimeUpdate(time);
    }
  }, [time, onTimeUpdate]);

  useEffect(() => {
    if (status !== 'STOPPED' && time === endTime) {
      setStatus('STOPPED');

      if (typeof onTimeOver === 'function') {
        onTimeOver();
      }
    }
  }, [endTime, onTimeOver, time, status, setStatus]);

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    if (status === 'RUNNING') {
      timeout = setTimeout(() => {
        const newTime = timerType === 'DEC' ? time - step : time + step;
        setTime(newTime);
      }, interval);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [status, time, step, timerType, interval]);

  return { pause, reset, start, status, time };
}
