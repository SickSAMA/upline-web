import { useMutation } from '@apollo/client';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Field, Submit } from '@/components/Form';
import Layout from '@/components/Layout';
import { NoticeModal } from '@/components/Modal';
import SAVE_FEEDBACK from '@/graphql/saveFeedback';
import { FeedbackInput } from '@/graphql/types/graphql-global-types';
import { SaveFeedback, SaveFeedbackVariables } from '@/graphql/types/SaveFeedback';
import { parseApolloError } from '@/utils/parseError';
import { EMAIL_PATTERN } from '@/utils/validationPatterns';

import style from './style.module.scss';

const defaultFeedback: FeedbackInput = {
  name: '',
  email: '',
  message: '',
};

export default function ContactUs(): JSX.Element {
  const { register, handleSubmit, reset, formState: { errors: clientErrors, isSubmitting } } = useForm<FeedbackInput>({
    defaultValues: defaultFeedback,
  });
  const [saveFeedback, { error: serverErrors }] = useMutation<SaveFeedback, SaveFeedbackVariables>(
      SAVE_FEEDBACK, {
        onCompleted() {
          // show success notice modal
          setIsNoticeModalOpen(true);
          // clear the form
          reset(undefined, {
            keepDirty: false,
            keepIsSubmitted: false,
            keepTouched: false,
          });
        },
        onError() {
          // show error notice modal
          setIsNoticeModalOpen(true);
        },
      });
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    await saveFeedback({ variables: { feedbackInput: data } });
  });

  const onNoticeModalClose = useCallback(() => {
    setIsNoticeModalOpen(false);
  }, []);

  return (
    <Layout>
      <div className={style.container}>
        <h1>Get In Touch!</h1>
        <p>Contact us and we&apos;d love to hear your feedbacks.</p>
        <div className={style.form}>
          <form onSubmit={onSubmit}>
            <div className={style.row}>
              <Field className={style['col-6']} label="Name" error={clientErrors.name?.message}>
                <input type='text' {...register('name', { required: 'Please enter your name.' })} />
              </Field>
              <Field className={style['col-6']} label="Email" error={clientErrors.email?.message}>
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
            </div>
            <div className={style.row}>
              <Field className={`${style['col-12']} ${style.message}`} label="Message" error={clientErrors.message?.message}>
                <textarea {...register('message', { required: 'Please enter your message.' })} />
              </Field>
            </div>
            <Submit isSubmitting={isSubmitting} className={style.submit} value="Send message" />
          </form>
        </div>
      </div>
      <NoticeModal
        isOpen={isNoticeModalOpen}
        type={serverErrors ? 'error' : 'success'}
        message={serverErrors ? parseApolloError(serverErrors) : 'Your message has been successfully sent.'}
        onClose={onNoticeModalClose}
      />
    </Layout>
  );
}
