import Link from 'next/link';
import React, { MouseEventHandler, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Check, ErrorMessage, Field, Submit } from '@/components/Form';
import { signUp } from '@/utils/auth';
import { LOGIN, PRIVACY_POLICY, TERMS_CONDITIONS } from '@/utils/routes';
import { EMAIL_PATTERN, PASSWORD_PATTERN } from '@/utils/validationPatterns';

import style from './style.module.scss';

interface JoinProps {
  onLoginClicked?(): void;
  onSignUpSuccess(username: string, password: string): void;
}

interface FormData {
  email: string;
  password: string;
  name: string;
  isTermAgreed: boolean;
}

const defaultFormData: FormData = {
  email: '',
  password: '',
  name: '',
  isTermAgreed: false,
};

export default function Join({ onLoginClicked, onSignUpSuccess }: JoinProps): JSX.Element {
  const { register, handleSubmit, control, formState: { errors: clientErrors, isSubmitting } } = useForm<FormData>({
    defaultValues: defaultFormData,
  });
  const [serverErrors, setErrorMsg] = useState('');

  const onSubmit = handleSubmit(async (data): Promise<void> => {
    const email = data.email.trim();
    const password = data.password.trim();
    const name = data.name.trim();

    try {
      await signUp({ name, email, password });
      onSignUpSuccess(email, password);
    } catch (error) {
      setErrorMsg(error.message);
    }
  });

  let jumpLink: JSX.Element;
  if (onLoginClicked) {
    const _onLoginClicked: MouseEventHandler = (e) => {
      e.preventDefault();
      onLoginClicked();
    };
    jumpLink = <a href={LOGIN} onClick={_onLoginClicked}>Sign in</a>;
  } else {
    jumpLink = <Link href={LOGIN}><a>Sign in</a></Link>;
  }

  return (
    <div>
      <h2 className={style.title}>Join now</h2>
      <form onSubmit={onSubmit}>
        <Field className={style.field} label="Name" error={clientErrors.name?.message}>
          <input type='text' {...register('name', { required: 'Please enter your name.' })} />
        </Field>
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
          <input
            type='password'
            {...register('password', {
              required: 'Your password can not be empty.',
              pattern: {
                value: PASSWORD_PATTERN,
                message: 'Your password must contain at least 8 characters including 1 digit.',
              },
            })}
          />
        </Field>
        <div className={style.joinTerm}>
          <Check
            id="isTermAgreed"
            label={
              <>
                By joining, you agree to our&nbsp;
                <Link href={TERMS_CONDITIONS}><a rel="noopener" target="_blank">Terms & Conditions</a></Link>
                &nbsp;and&nbsp;
                <Link href={PRIVACY_POLICY}><a rel="noopener" target="_blank">Privacy Policy</a></Link>
                .
              </>
            }
            error={clientErrors.isTermAgreed?.message}
            control={control}
            name="isTermAgreed"
            rules={{ required: 'You must accept our terms of use and privacy policy.' }}
          />
        </div>
        {
          serverErrors && <ErrorMessage className={style.errorMsg} message={serverErrors} />
        }
        <Submit isSubmitting={isSubmitting} className={style.submit} value="Create account" />
        <div className={style.jumpLink}>
          Already have an account? { jumpLink }.
        </div>
      </form>
    </div>
  );
}
