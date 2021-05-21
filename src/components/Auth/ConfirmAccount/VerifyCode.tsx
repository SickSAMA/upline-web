import React, { MouseEventHandler, useState } from 'react';
import { useForm } from 'react-hook-form';

import { ErrorMessage, Field, Submit } from '@/components/Form';
import { confirmRegistration, login, resentConfirmationCode } from '@/utils/auth';
import { parseAnyError } from '@/utils/parseError';
import useTimer from '@/utils/useTimer';

import style from '../style.module.scss';


interface ConfirmAccountProps {
  userData?: UserData;
  onAccountConfirmed?(): void;
}

export interface UserData {
  username: string;
  password?: string;
}

interface FormData {
  code: string;
}

const defaultFormData: FormData = {
  code: '',
};

export default function VerifyCode({ userData, onAccountConfirmed }: ConfirmAccountProps): JSX.Element {
  const { register, handleSubmit, formState: { errors: clientErrors, isSubmitting } } = useForm<FormData>({
    defaultValues: defaultFormData,
  });
  const [serverErrors, setErrorMsg] = useState('');
  const { start: startTimer, reset: resetTimer, time, status: timerStatus } = useTimer({
    autostart: false,
    startTime: 60,
    endTime: 0,
    step: 1,
    timerType: 'DEC',
  });

  const onSubmit = handleSubmit(async (data): Promise<void> => {
    const username = userData?.username;
    const password = userData?.password;

    if (!username) {
      setErrorMsg('No username is provided');
      return;
    }

    const code = data.code.trim();

    try {
      await confirmRegistration(username, code);
      if (password) {
        login(username, password);
        location.reload();
      } else if (onAccountConfirmed) {
        onAccountConfirmed();
      }
    } catch (err) {
      setErrorMsg(parseAnyError(err));
    }
  });

  const onResend: MouseEventHandler = async (e) => {
    e.preventDefault();

    if (timerStatus === 'RUNNING') {
      return;
    }

    const username = userData?.username;
    if (!username) {
      setErrorMsg('No username is provided');
      return;
    }

    try {
      await resentConfirmationCode(username);
      resetTimer();
      startTimer();
    } catch (err) {
      setErrorMsg(parseAnyError(err));
    }
  };

  return (
    <div>
      <h2 className={style.title}>Confirm account</h2>
      <p className={style.subTitle}>
        A confirmation code has been sent to your registered email address. Didn&apos;t
        receive it? Check your spam folder or&nbsp;
        {
          timerStatus === 'RUNNING' ?
            <span>Resend in { time }s</span> :
            <a onClick={onResend} href="#">Resend now</a>
        }
        .
      </p>
      <form onSubmit={onSubmit}>
        <Field className={style.field} label="Confirmation code" error={clientErrors.code?.message}>
          <input
            type='text'
            {...register('code', {
              required: 'Please enter your confirmation code.',
            })}
          />
        </Field>
        {
          serverErrors && <ErrorMessage className={style.errorMsg} message={serverErrors} />
        }
        <Submit isSubmitting={isSubmitting} className={style.submit} value="Continue" />
      </form>
    </div>
  );
}
