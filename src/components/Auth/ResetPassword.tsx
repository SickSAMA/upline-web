import Link from 'next/link';
import React, { MouseEventHandler, useState } from 'react';
import { useForm } from 'react-hook-form';

import { ErrorMessage, Field, Submit } from '@/components/Form';
import { JOIN, LOGIN } from '@/utils/routes';
import { EMAIL_PATTERN } from '@/utils/validationPatterns';

import style from './style.module.scss';

interface ResetPasswordProps {
  onLoginClicked?(): void;
  onJoinClicked?(): void;
}

interface FormData {
  email: string;
}

const defaultFormData: FormData = {
  email: '',
};

export default function ResetPassword({ onLoginClicked, onJoinClicked }: ResetPasswordProps): JSX.Element {
  const { register, handleSubmit, formState: { errors: clientErrors, isSubmitting } } = useForm<FormData>({
    defaultValues: defaultFormData,
  });
  const [serverErrors, setErrorMsg] = useState('');

  const onSubmit = handleSubmit(async (data): Promise<void> => {
    const email = data.email.trim();
    console.log(email);
    setErrorMsg('');
  });

  let loginLink: JSX.Element;
  if (onLoginClicked) {
    const _onLoginClicked: MouseEventHandler = (e) => {
      e.preventDefault();
      onLoginClicked();
    };
    loginLink = <a href={LOGIN} onClick={_onLoginClicked}>Return to sign in</a>;
  } else {
    loginLink = <Link href={LOGIN}><a>Return to sign in</a></Link>;
  }

  let joinLink: JSX.Element;
  if (onJoinClicked) {
    const _onJoinClicked: MouseEventHandler = (e) => {
      e.preventDefault();
      onJoinClicked();
    };
    joinLink = <a href={JOIN} onClick={_onJoinClicked}>join now</a>;
  } else {
    joinLink = <Link href={JOIN}><a>join now</a></Link>;
  }

  return (
    <div>
      <h2 className={style.title}>Reset your password</h2>
      <p className={style.subTitle}>
        Enter the email address associated with your account and we will send you a link to reset your password.
      </p>
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
        {
          serverErrors && <ErrorMessage className={style.errorMsg} message={serverErrors} />
        }
        <Submit isSubmitting={isSubmitting} className={style.submit} value="Continue" />
        <div className={style.jumpLink}>
          { loginLink } or { joinLink }
        </div>
      </form>
    </div>
  );
}
