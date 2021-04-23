import { useCallback, useEffect, useState } from 'react';

import useInterval from './useInterval';

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
  const [delay, setDelay] = useState<number | null>(null);

  const pause = useCallback(() => {
    setStatus('PAUSED');
    setDelay(null);
  }, []);

  const reset = useCallback(() => {
    setStatus('STOPPED');
    setDelay(null);
    setTime(startTime);
  }, [startTime]);

  const start = useCallback(() => {
    setStatus('RUNNING');
    setDelay(interval);
  }, [interval]);

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
      setDelay(null);

      if (typeof onTimeOver === 'function') {
        onTimeOver();
      }
    }
  }, [endTime, onTimeOver, time, status]);

  useInterval(() => {
    const newTime = timerType === 'DEC' ? time - step : time + step;
    setTime(newTime);
  }, delay);

  return { pause, reset, start, status, time };
}
