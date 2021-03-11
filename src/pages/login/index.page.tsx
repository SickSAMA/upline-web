import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { login } from '@/utils/auth';

interface FormData {
  email: string
  password: string
}

const Login = (): JSX.Element => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = handleSubmit((data): void => {
    const email = data.email.trim();
    const password = data.password.trim();
    login({
      username: email,
      password,
    }, {
      onSuccess: () => {
        location.reload();
      },
      onFailure: (error: Error) => {
        setErrorMsg(error.message);
      },
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <div>
        <div>
          <label>Email:</label>
        </div>
        <div>
          <input {...register('email', { required: true })} />
        </div>
      </div>
      <div>
        <div>
          <label>Password</label>
        </div>
        <div>
          <input {...register('password', { required: true })} />
        </div>
      </div>
      <div>
        {(errors.email || errors.password) && 'Last name is required.'}
        { errorMsg }
      </div>
      <div>
        <input type="submit" />
      </div>
    </form>
  );
};

export default Login;
