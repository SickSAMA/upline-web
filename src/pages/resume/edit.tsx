import React from 'react';

import { Field } from '@/components/Form';
// import { useForm } from 'react-hook-form';
import Layout from '@/components/Layout';

import style from './style.module.scss';

export default function ResumeEditor(): JSX.Element {
  // const { register, handleSubmit, errors } = useForm();
  // const [errorMsg, setErrorMsg] = useState('');

  // const onSubmit = (data: FormData): void => {
  //   // const email = data.email.trim();
  //   // const password = data.password.trim();
  //   // login({
  //   //   username: email,
  //   //   password,
  //   // }, {
  //   //   onSuccess: () => {
  //   //     location.reload();
  //   //   },
  //   //   onFailure: (error: Error) => {
  //   //     setErrorMsg(error.message);
  //   //   },
  //   // });
  // };

  return (
    <Layout>
      <div className={style.container}>
        <div className={style.preview}>

        </div>
        <div className={style.editor}>
          <form className={style.rowWrapper} onSubmit={() => {}}>
            <div className={style.row}>
              <Field className={style['col-6']} label="Name">
                <input type="text" name="name" placeholder="Input your name" />
              </Field>
              <Field className={style['col-6']} label="English Name" error>
                <input type="text" name="english_name" />
              </Field>
            </div>
            <div className={style.row}>
              <Field className={style['col-6']} label="Email" readonly>
                <input type="text" name="email" value="sick@gmail.com" />
              </Field>
              <Field className={style['col-6']} label="Phone">
                <input type="file" name="phone" />
              </Field>
            </div>
            <div className={style.row}>
              <Field className={style['col-6']} label="Email">
                <textarea name="email" value="sick@gmail.com" />
              </Field>
              <Field className={style['col-6']} label="Color">
                <input type="color" name="phone" />
              </Field>
            </div>
            <div>
              <div>
                <label>Password</label>
              </div>
              <div>
                <input name="password" />
              </div>
            </div>
            <div>
              <input type="submit" />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
