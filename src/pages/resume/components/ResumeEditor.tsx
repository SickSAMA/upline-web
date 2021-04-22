/* eslint-disable camelcase */
import { useMutation } from '@apollo/client';
import isEqual from 'lodash/isEqual';
import Link from 'next/link';
import React, { MouseEventHandler, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Collapse, CollapsePanel } from '@/components/Collapse';
import { Field } from '@/components/Form';
import { LoginModal, NoticeModal } from '@/components/Modal';
import IconAvatar from '@/components/SVG/avatar.svg';
import SAVE_RESUME from '@/graphql/saveResume';
import { ExperienceInput, ResumeInput, SkillInput } from '@/graphql/types/graphql-global-types';
import { SaveResume, SaveResumeVariables } from '@/graphql/types/SaveResume';
import { generateResumePDF } from '@/utils/generatePDF';
import { HOME } from '@/utils/routes';
import useAuth from '@/utils/useAuth';
import useInterval from '@/utils/useInterval';

import style from '../style.module.scss';
import { saveResume as saveResumeToCache } from '../utils/resumeStore';
import ExperienceForm from './ExperienceForm';
import ResumePreview from './ResumePreview';
import SkillForm from './SkillForm';

// set default values for all fields to align with returned resume data from serverj
export interface ResumeFormData extends ResumeInput {
  name: string;
  english_name: string;
  phone: string;
  email: string;
  address: string;
  education: ExperienceInput[];
  professional_experience: ExperienceInput[];
  leadership_experience: ExperienceInput[];
  others: SkillInput[];
}

const defaultResume: ResumeFormData = {
  name: '',
  english_name: '',
  phone: '',
  email: '',
  address: '',
  education: [],
  professional_experience: [],
  leadership_experience: [],
  others: [],
};

type Tabs = 'content' | 'style';

interface ResumeEditorProps {
  resume?: ResumeFormData | undefined;
}

export default function ResumeEditor({ resume }: ResumeEditorProps): JSX.Element {
  const [isLogin] = useAuth();
  const { register, reset, control, watch, formState } = useForm<ResumeFormData>({
    defaultValues: resume || defaultResume,
  });
  const resumeFormData = watch();
  const [saveResume, { error: resumeSaveError, loading: resumeSaving }] = useMutation<SaveResume, SaveResumeVariables>(
      SAVE_RESUME, {
        onCompleted() {
          setIsSynced(true);
        },
        onError(error) {
          console.log(error.message);
          setIsNoticeModalOpen(true);
        },
      });
  const [activeTab, setActiveTab] = useState<Tabs>('content');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  // two state to manage the change of form values
  const [resumeToRender, setResumeToRender] = useState<ResumeFormData>(resume || defaultResume);
  const [hasEdited, setHasEdited] = useState(false);
  // state to manage the sync to cloud featreu
  const [isSynced, setIsSynced] = useState(true);

  /**
   * due to the frequent reference change of resumeFormData without real change in the data itself, use a new
   * variable to hold the resume to render. The new variable is only updated when deep comparision passes.
   */
  useEffect(() => {
    if (!isEqual(resumeToRender, resumeFormData)) {
      setResumeToRender(resumeFormData);
      // update hasEdited together with resumeToRender only trigger the save to cache effect once for every change
      if (!hasEdited && formState.isDirty) {
        // once hasEdited is set to true, it's always true
        setHasEdited(formState.isDirty);
      }
      if (hasEdited || formState.isDirty) {
        setIsSynced(false);
      }
    }
  }, [resumeFormData, resumeToRender, setResumeToRender, hasEdited, setHasEdited, setIsSynced, formState.isDirty]);

  // save resume to cache if form data is modified.
  useEffect(() => {
    if (hasEdited) {
      saveResumeToCache(resumeToRender);
    }
  }, [resumeToRender, hasEdited]);

  // reset form when props.resume changes
  useEffect(() => {
    reset(resume, {
      keepDefaultValues: false,
      keepDirty: false,
    });
  }, [resume, reset]);

  // sync to server every 60 sec
  useInterval(() => {
    if (isLogin && !isSynced) {
      saveResume({ variables: { resumeInput: resumeToRender } });
    }
  }, 1000 * 60);

  const syncToServer = () => {
    if (!isLogin) {
      setIsLoginModalOpen(true);
    } else {
      saveResume({ variables: { resumeInput: resumeToRender } });
    }
  };

  const closeLoginModal = useCallback(() => {
    setIsLoginModalOpen(false);
  }, [setIsLoginModalOpen]);

  const closeNoticeModal: MouseEventHandler = useCallback((e) => {
    e.preventDefault();
    setIsNoticeModalOpen(false);
  }, [setIsNoticeModalOpen]);

  return (
    <>
      <div className={style.editor}>
        <div className={style.header}>
          <div>
            <Link href={HOME}>
              <a className={style['header__logo']}>
                U
              </a>
            </Link>
            <div className={style['header__name']}>New Resume</div>
          </div>
          <div>
            <button type="button" onClick={() => generateResumePDF(resumeToRender)} className={style['header__pdf']}>Generate PDF</button>
            <button type="button" onClick={syncToServer} className={style['header__save']} disabled={isSynced}>
              {
                resumeSaving ?
                  'Saving...' :
                  (isSynced ? 'Saved': 'Save to Cloud')
              }
            </button>
            <Link href="#">
              <a className={style['header__account']}>
                <IconAvatar />
              </a>
            </Link>
          </div>
        </div>
        <div className={style['editor__body']}>
          <div className={style['editor__preview']}>
            <ResumePreview resume={resumeToRender} />
          </div>
          <div className={style['editor__edit']}>
            <div className={style.tabs}>
              <button disabled={activeTab === 'content'} onClick={() => setActiveTab('content')}>Content</button>
              <button disabled={activeTab === 'style'} onClick={() => setActiveTab('style')}>Style</button>
            </div>
            <div>
              <form onSubmit={(e) => e.preventDefault()}>
                <Collapse accordion={false} defaultActiveKey="0">
                  <CollapsePanel
                    key="0"
                    header="Basic Info"
                    className={style['collapse__item']}
                    forceRender={true}
                  >
                    <div className={style.row}>
                      <Field className={style['col-6']} label="Name">
                        <input type="text" {...register('name')} />
                      </Field>
                      <Field className={style['col-6']} label="English Name">
                        <input type="text" {...register('english_name')} />
                      </Field>
                    </div>
                    <div className={style.row}>
                      <Field className={style['col-6']} label="Phone">
                        <input type="text" {...register('phone')} />
                      </Field>
                      <Field className={style['col-6']} label="Email">
                        <input type="text" {...register('email')} />
                      </Field>
                    </div>
                    <div className={style.row}>
                      <Field className={style['col-12']} label="Address">
                        <input type="text" {...register('address')} />
                      </Field>
                    </div>
                  </CollapsePanel>
                  <CollapsePanel
                    key="1"
                    header="Education"
                    className={style['collapse__item']}
                    forceRender={true}
                  >
                    <ExperienceForm
                      control={control}
                      register={register}
                      type="education"
                      fieldNameMapping={{
                        entity: 'University',
                        summary: 'Degree Name',
                        details: 'Achievements',
                      }} />
                  </CollapsePanel>
                  <CollapsePanel
                    key="2"
                    header="Professional Experience"
                    className={style['collapse__item']}
                    forceRender={true}
                  >
                    <ExperienceForm
                      control={control}
                      register={register}
                      type="professional_experience"
                      fieldNameMapping={{
                        entity: 'Company',
                        summary: 'Division, Position',
                        details: 'Achievements',
                      }} />
                  </CollapsePanel>
                  <CollapsePanel
                    key="3"
                    header="Leadership Experience"
                    className={style['collapse__item']}
                    forceRender={true}
                  >
                    <ExperienceForm
                      control={control}
                      register={register}
                      type="leadership_experience"
                      fieldNameMapping={{
                        entity: 'Organization/Competition Name',
                        summary: 'Position',
                        details: 'Achievements',
                      }} />
                  </CollapsePanel>
                  <CollapsePanel
                    key="4"
                    header="Others"
                    className={style['collapse__item']}
                    forceRender={true}
                  >
                    <SkillForm control={control} register={register} />
                  </CollapsePanel>
                </Collapse>
              </form>
            </div>
          </div>
        </div>
      </div>
      <LoginModal isOpen={isLoginModalOpen} onRequestClose={closeLoginModal} />
      <NoticeModal
        isOpen={isNoticeModalOpen}
        type="error"
        message={resumeSaveError?.message || ''}
        onClose={closeNoticeModal}
      />
    </>
  );
}
