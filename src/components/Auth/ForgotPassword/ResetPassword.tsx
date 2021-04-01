import React, { MouseEventHandler, useState } from 'react';
import { useForm } from 'react-hook-form';

import { ErrorMessage, Field, Submit } from '@/components/Form';
import { confirmPassword, forgotPassword, login } from '@/utils/auth';
import parseError from '@/utils/parseError';
import useTimer from '@/utils/useTimer';
import { PASSWORD_PATTERN } from '@/utils/validationPatterns';

import style from '../style.module.scss';

interface ResetPasswordProps {
  username?: string;
  onChangeUsername(): void;
}

interface FormData {
  code: string;
  password: string;
  password2: string;
}

const defaultFormData: FormData = {
  code: '',
  password: '',
  password2: '',
};


export default function ResetPassword({ username, onChangeUsername }: ResetPasswordProps): JSX.Element {
  const { register, handleSubmit, watch, formState: { errors: clientErrors, isSubmitting } } = useForm<FormData>({
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

  const onResend: MouseEventHandler = async (e) => {
    e.preventDefault();

    if (timerStatus === 'RUNNING') {
      return;
    }

    if (!username) {
      setErrorMsg('No username is provided');
      return;
    }

    try {
      await forgotPassword(username);
      resetTimer();
      startTimer();
    } catch (err) {
      setErrorMsg(parseError(err));
    }
  };

  const onSubmitResetPassword = handleSubmit(async (data): Promise<void> => {
    const { code, password } = data;

    if (!username) {
      setErrorMsg('No username is provided');
      return;
    }

    try {
      await confirmPassword(username, code.trim(), password);
      await login(username, password);
      location.reload();
    } catch (error) {
      setErrorMsg(error.message);
    }
  });

  const _onChangeUsername: MouseEventHandler = (e) => {
    e.preventDefault();
    onChangeUsername();
  };


  return (
    <>
      <h2 className={style.title}>Reset your password</h2>
      <p className={style.subTitle}>
        A confirmation code has been sent to your provided email address. Didn&apos;t
        receive it? Check your spam folder or&nbsp;
        {
          timerStatus === 'RUNNING' ?
            <span>Resend in { time }s</span> :
            <a onClick={onResend} href="#">Resend now</a>
        }
        .&nbsp;Still not received?&nbsp;
        <a onClick={_onChangeUsername} href="#">try another email</a>
        .
      </p>
      <form onSubmit={onSubmitResetPassword}>
        <Field className={style.field} label="Confirmation code" error={clientErrors.code?.message}>
          <input
            type='text'
            {...register('code', {
              required: 'Please enter your confirmation code.',
            })}
          />
        </Field>
        <Field className={style.field} label="New password" error={clientErrors.password?.message}>
          <input
            type='password'
            {...register('password', {
              required: 'Your new password can not be empty.',
              pattern: {
                value: PASSWORD_PATTERN,
                message: 'Your password must contain at least 8 characters including 1 digit.',
              },
            })}
          />
        </Field>
        <Field className={style.field} label="Confirm new password" error={clientErrors.password2?.message}>
          <input
            type='password'
            {...register('password2', {
              required: 'Your confirm new password can not be empty.',
              validate: (value) => value === watch('password') || 'Passwords don\'t match.',
            })}
          />
        </Field>
        {
          serverErrors && <ErrorMessage className={style.errorMsg} message={serverErrors} />
        }
        <Submit isSubmitting={isSubmitting} className={style.submit} value="Continue" />
      </form>
    </>
  );
}
