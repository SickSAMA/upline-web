import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { ErrorMessage, Field, Submit } from '@/components/Form';
import { resentConfirmationCode } from '@/utils/auth';
import parseError from '@/utils/parseError';
import { EMAIL_PATTERN } from '@/utils/validationPatterns';

import style from '../style.module.scss';

interface ProvideUsernameProps {
  onCodeSent(username: string): void;
}

interface FormData {
  email: string;
}

const defaultFormData: FormData = {
  email: '',
};

export default function ProvideUsername({ onCodeSent }: ProvideUsernameProps): JSX.Element {
  const { register, handleSubmit, formState: { errors: clientErrors, isSubmitting } } = useForm<FormData>({
    defaultValues: defaultFormData,
  });
  const [serverErrors, setErrorMsg] = useState('');

  const onSubmitUsername= handleSubmit(async (data): Promise<void> => {
    const username = data.email.trim();
    try {
      await resentConfirmationCode(username);
      onCodeSent(username);
    } catch (error) {
      setErrorMsg(parseError(error));
    }
  });

  return (
    <>
      <h2 className={style.title}>Confirm account</h2>
      <p className={style.subTitle}>
        Enter the email address associated with your account and we will send you a verification
        code to confirm your account.
      </p>
      <form onSubmit={onSubmitUsername}>
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
      </form>
    </>
  );
}
