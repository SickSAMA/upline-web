import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signUp } from '@/libs/auth';

interface FormData {
  email: string
  password: string
  name: string
}

const SignUp = (): JSX.Element => {
  const { register, handleSubmit, errors } = useForm();
  const [errorMsg, setErrorMsg] = useState('');
  const onSubmit = (data: FormData): void => {
    const email = data.email.trim();
    const password = data.password.trim();
    const name = data.name.trim();
    signUp({ name, email, password }, (err, result) => {
      if (err) {
        setErrorMsg(err.message);
        return;
      }
      if (result && result.user) {
        setErrorMsg('');
        console.log('user name is ' + result.user.getUsername());
        console.log('call result: ' + JSON.stringify(result, null, 2));
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div>
          <label>Display Name:</label>
        </div>
        <div>
          <input name="name" ref={register({ required: true })} />
        </div>
      </div>
      <div>
        <div>
          <label>Email:</label>
        </div>
        <div>
          <input name="email" ref={register({ required: true })} />
        </div>
      </div>
      <div>
        <div>
          <label>Password</label>
        </div>
        <div>
          <input name="password" ref={register({ required: true })} />
        </div>
      </div>
      <div>
        {(errors.email || errors.password || errors.name) && 'Last name is required.'}
        { errorMsg }
      </div>
      <div>
        <input type="submit" />
      </div>
    </form>
  );
};

export default SignUp;
