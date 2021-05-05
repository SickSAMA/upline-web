import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Field, Submit } from '@/components/Form';
import Layout from '@/components/Layout';
import { getUserAttributes } from '@/utils/auth';
import { PASSWORD_PATTERN } from '@/utils/validationPatterns';
import withAuth from '@/utils/withAuth';

import BodyLayout from './components/BodyLayout';
import style from './style.module.scss';

interface DetailFormData {
  name: string;
}

interface PasswordFormData {
  password: string;
  password2: string;
}

function Account(): JSX.Element {
  const [userAttributes, setUserAttributes] = useState<CognitoUserAttribute[]>();
  const { register: registerDetailForm, reset: resetDetailForm } = useForm<DetailFormData>();
  const { register: registerPasswordForm, watch: watchPasswordForm } = useForm<PasswordFormData>();

  // load user attributes
  useEffect(() => {
    const loadUserAttributes = async () => {
      try {
        const _userAttributes = await getUserAttributes();
        setUserAttributes(_userAttributes);
        resetDetailForm({
          name: _userAttributes.find((u) => u.getName() === 'name')?.getValue(),
        }, {
          keepDefaultValues: false,
          keepDirty: false,
        });
      } catch (error) {
        console.error(error);
      }
    };
    loadUserAttributes();
  }, [resetDetailForm]);

  return (
    <Layout>
      <BodyLayout>
        {
          userAttributes ?
            (
              <div className={style.account}>
                <div>
                  <h2>Account Details</h2>
                  <form>
                    <div className={style['account__row']}>
                      <div>Email</div>
                      <div>{userAttributes.find((u) => u.getName() === 'email')?.getValue()}</div>
                    </div>
                    <div className={style['account__row']}>
                      <div>Name</div>
                      <Field className={style['col-6']}>
                        <input type="text" {...registerDetailForm('name')} />
                      </Field>
                    </div>
                    <Submit className={style['account__submit']} value="Save changes" isSubmitting={false} />
                  </form>
                </div>
                <div>
                  <h2>Change Password</h2>
                  <form>
                    <div className={style['account__row']}>
                      <div>New password</div>
                      <Field>
                        <input
                          type='password'
                          {...registerPasswordForm('password', {
                            required: 'Your new password can not be empty.',
                            pattern: {
                              value: PASSWORD_PATTERN,
                              message: 'Your password must contain at least 8 characters including 1 digit.',
                            },
                          })}
                        />
                      </Field>
                    </div>
                    <div className={style['account__row']}>
                      <div>Confirm password</div>
                      <Field>
                        <input
                          type='password'
                          {...registerPasswordForm('password2', {
                            required: 'Your confirm new password can not be empty.',
                            validate: (value) => value === watchPasswordForm('password') || 'Passwords don\'t match.',
                          })}
                        />
                      </Field>
                    </div>
                    <Submit className={style['account__submit']} value="Update password" isSubmitting={false} />
                  </form>
                </div>
              </div>
            ) :
            (
              <div />
            )
        }
      </BodyLayout>
    </Layout>
  );
}

export default withAuth(Account);
