import Link from 'next/link';
import React, { MouseEventHandler, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Check, ErrorMessage, Field, Submit } from '@/components/Form';
import { login } from '@/utils/auth';
import { JOIN, RESET_PASSWORD } from '@/utils/routes';
import { EMAIL_PATTERN } from '@/utils/validationPatterns';

import style from './style.module.scss';

interface FormData {
  email: string;
  password: string;
  isStaySignedIn: boolean;
}

interface LoginProps {
  onLoginSuccess?(): void;
  onJoinClicked?(): void;
  onResetPasswordClicked?(): void;
}

const defaultFormData: FormData = {
  email: '',
  password: '',
  isStaySignedIn: true,
};

export default function Login({ onLoginSuccess, onJoinClicked, onResetPasswordClicked }: LoginProps): JSX.Element {
  const { register, handleSubmit, control, formState: { errors: clientErrors, isSubmitting } } = useForm<FormData>({
    defaultValues: defaultFormData,
  });
  const [serverErrors, setErrorMsg] = useState('');

  const onSubmit = handleSubmit(async (data): Promise<void> => {
    const email = data.email.trim();
    const password = data.password.trim();
    try {
      await login({ username: email, password });
      if (onLoginSuccess) {
        onLoginSuccess();
      }
      location.reload();
    } catch (error) {
      setErrorMsg(error.message);
    }
  });

  let resetPasswordLink: JSX.Element;
  if (onResetPasswordClicked) {
    const _onResetPasswordClicked: MouseEventHandler = (e) => {
      e.preventDefault();
      onResetPasswordClicked();
    };
    resetPasswordLink = <a href={RESET_PASSWORD} onClick={_onResetPasswordClicked}>Forgot your password?</a>;
  } else {
    resetPasswordLink = <Link href={RESET_PASSWORD}><a>Forgot your password?</a></Link>;
  }

  let joinLink: JSX.Element;
  if (onJoinClicked) {
    const _onJoinClicked: MouseEventHandler = (e) => {
      e.preventDefault();
      onJoinClicked();
    };
    joinLink = <a href={JOIN} onClick={_onJoinClicked}>Join now</a>;
  } else {
    joinLink = <Link href={JOIN}><a>Join now</a></Link>;
  }

  return (
    <div>
      <h2 className={style.title}>Sign in</h2>
      <form onSubmit={onSubmit}>
        <Field className={style.field} label="Email" error={clientErrors.email?.message}>
          <input
            type='text'
            {...register('email', {
              required: 'Please enter your email address.',
              pattern: {
                value: EMAIL_PATTERN,
                message: 'Please enter a valid email address.',
              },
            })}
          />
        </Field>
        <Field className={style.field} label="Password" error={clientErrors.password?.message}>
          <input type='password' {...register('password', { required: 'Please enter your password.' })} />
        </Field>
        {
          serverErrors && <ErrorMessage className={style.errorMsg} message={serverErrors} />
        }
        <div className={style.loginOptions}>
          { resetPasswordLink }
          <Check
            type="switch"
            id="isStaySignedIn"
            label="Stay signed in"
            control={control}
            name="isStaySignedIn"
          />
        </div>
        <Submit isSubmitting={isSubmitting} className={style.submit} value="Continue" />
        <div className={style.jumpLink}>
          Don&apos;t have an account? { joinLink }.
        </div>
      </form>
    </div>
  );
}
