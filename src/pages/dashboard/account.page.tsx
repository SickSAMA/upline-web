import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Field, Submit } from '@/components/Form';
import Layout from '@/components/Layout';
import { NoticeModal, NoticeType } from '@/components/Modal';
import { Skeleton, SkeletonCol, SkeletonRow } from '@/components/Skeleton';
import { changePassword, getUserAttributes, updateUserAttributes } from '@/utils/auth';
import parseError from '@/utils/parseError';
import { PASSWORD_PATTERN } from '@/utils/validationPatterns';
import withAuth from '@/utils/withAuth';

import BodyLayout from './components/BodyLayout';
import style from './style.module.scss';

interface DetailFormData {
  name: string;
}

interface PasswordFormData {
  oldPassword: string;
  newPassword: string;
  newPassword2: string;
}

function Account(): JSX.Element {
  const [userAttributes, setUserAttributes] = useState<CognitoUserAttribute[]>();
  const [notice, setNotice] = useState('');
  const [noticeType, setNoticeType] = useState<NoticeType>('error');
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);

  const { register: registerDetailForm, reset: resetDetailForm, handleSubmit: handleDetailFormSubmit,
    formState: { errors: detailFormErrors, isSubmitting: isDetailFormSubmitting } } = useForm<DetailFormData>();
  const { register: registerPasswordForm, watch: watchPasswordForm, handleSubmit: handlePasswordFormSubmit,
    reset: resetPasswordForm, formState: { errors: passwordFormErrors, isSubmitting: isPasswordFormSubmitting } } = useForm<PasswordFormData>();


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

  const saveDetails = handleDetailFormSubmit(async (data) => {
    try {
      await updateUserAttributes([{ Name: 'name', Value: data.name }]);
      setNotice('Changes were successfully saved');
      setNoticeType('success');
      setIsNoticeModalOpen(true);
    } catch (error) {
      setNotice(parseError(error));
      setNoticeType('error');
      setIsNoticeModalOpen(true);
    }
  });

  const updatePassword = handlePasswordFormSubmit(async (data) => {
    const { oldPassword, newPassword } = data;
    try {
      await changePassword(oldPassword, newPassword);
      setNotice('Password was successfully changed');
      setNoticeType('success');
      setIsNoticeModalOpen(true);
      resetPasswordForm(undefined, {
        keepDirty: false,
        keepIsSubmitted: false,
        keepTouched: false,
      });
    } catch (error) {
      setNotice(parseError(error));
      setNoticeType('error');
      setIsNoticeModalOpen(true);
    }
  });

  const closeErrorModal = useCallback(() => {
    setIsNoticeModalOpen(false);
  }, []);

  return (
    <Layout>
      <BodyLayout>
        {
          userAttributes &&
            (
              <div className={style.account}>
                <div>
                  <h2>Account Details</h2>
                  <form onSubmit={saveDetails}>
                    <div className={style['account__row']}>
                      <div>Email</div>
                      <div>{userAttributes.find((u) => u.getName() === 'email')?.getValue()}</div>
                    </div>
                    <div className={style['account__row']}>
                      <div>Name</div>
                      <Field error={detailFormErrors.name?.message}>
                        <input type="text" {...registerDetailForm('name', { required: 'Please enter your name.' })} />
                      </Field>
                    </div>
                    <Submit className={style['account__submit']} value="Save changes" isSubmitting={isDetailFormSubmitting} />
                  </form>
                </div>
                <div>
                  <h2>Change Password</h2>
                  <form onSubmit={updatePassword}>
                    <div className={style['account__row']}>
                      <div>Old password</div>
                      <Field error={passwordFormErrors.oldPassword?.message}>
                        <input
                          type='password'
                          {...registerPasswordForm('oldPassword', {
                            required: 'Please enter your old password.',
                          })}
                        />
                      </Field>
                    </div>
                    <div className={style['account__row']}>
                      <div>New password</div>
                      <Field error={passwordFormErrors.newPassword?.message}>
                        <input
                          type='password'
                          {...registerPasswordForm('newPassword', {
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
                      <Field error={passwordFormErrors.newPassword2?.message}>
                        <input
                          type='password'
                          {...registerPasswordForm('newPassword2', {
                            required: 'Your confirm new password can not be empty.',
                            validate: (value) => value === watchPasswordForm('newPassword') || 'Passwords don\'t match.',
                          })}
                        />
                      </Field>
                    </div>
                    <Submit className={style['account__submit']} value="Update password" isSubmitting={isPasswordFormSubmitting} />
                  </form>
                </div>
              </div>
            )
        }
      </BodyLayout>
      <NoticeModal
        isOpen={isNoticeModalOpen}
        type={noticeType}
        message={notice}
        onClose={closeErrorModal}
      />
    </Layout>
  );
}

export default withAuth(Account);
