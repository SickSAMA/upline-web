import React, { MouseEventHandler, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Check, ErrorMessage, Field, Submit } from '@/components/Form';
import { login } from '@/utils/auth';
import parseError from '@/utils/parseError';
import { CONFIRM_ACCOUNT, JOIN, RESET_PASSWORD } from '@/utils/routes';
import { EMAIL_PATTERN } from '@/utils/validationPatterns';

import style from './style.module.scss';

interface FormData {
  email: string;
  password: string;
  isStaySignedIn: boolean;
}

interface LoginProps {
  onLoginSuccess?(): void;
  onJoinClicked: MouseEventHandler;
  onForgotPassword: MouseEventHandler;
  onConfirmAccount(): void;
}

const defaultFormData: FormData = {
  email: '',
  password: '',
  isStaySignedIn: true,
};

export default function Login({ onLoginSuccess, onJoinClicked, onForgotPassword, onConfirmAccount }: LoginProps): JSX.Element {
  const { register, handleSubmit, control, formState: { errors: clientErrors, isSubmitting } } = useForm<FormData>({
    defaultValues: defaultFormData,
  });
  const [serverErrors, setErrorMsg] = useState<string | JSX.Element>('');

  const onSubmit = handleSubmit(async (data): Promise<void> => {
    const email = data.email.trim();
    const password = data.password.trim();
    const isStaySignedIn = data.isStaySignedIn;
    try {
      await login(email, password, isStaySignedIn);
      if (onLoginSuccess) {
        onLoginSuccess();
      }
      location.reload();
    } catch (error) {
      if (error.code === 'UserNotConfirmedException') {
        setErrorMsg((
          <>
            User is not confirmed. Please <a href={CONFIRM_ACCOUNT} onClick={onConfirmAccount}>confirm your account</a>
          </>
        ));
      } else {
        setErrorMsg(parseError(error));
      }
    }
  });

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
          <a href={RESET_PASSWORD} onClick={onForgotPassword}>Forgot your password?</a>
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
          Don&apos;t have an account? <a href={JOIN} onClick={onJoinClicked}>Join now</a>.
        </div>
      </form>
    </div>
  );
}
