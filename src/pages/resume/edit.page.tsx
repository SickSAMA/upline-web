/* eslint-disable camelcase */
import { useLazyQuery, useMutation } from '@apollo/client';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Collapse, CollapsePanel } from '@/components/Collapse';
import { Field } from '@/components/Form';
import Layout from '@/components/Layout';
import GET_RESUME from '@/graphql/getResume';
import SAVE_RESUME from '@/graphql/saveResume';
import { GetResume } from '@/graphql/types/GetResume';
import { ExperienceInput, ResumeInput, SkillInput } from '@/graphql/types/graphql-global-types';
import { SaveResume, SaveResumeVariables } from '@/graphql/types/SaveResume';
import { generateResumePDF } from '@/utils/generatePDF';

import ExperienceForm from './components/ExperienceForm';
import SkillForm from './components/SkillForm';
import style from './style.module.scss';

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

type Tabs = 'content' | 'style';

export default function ResumeEditor(): JSX.Element {
  // todo
  const { register, getValues, handleSubmit, reset, control } = useForm<ResumeFormData>();
  const [getResume, { data: getResumeResult }]= useLazyQuery<GetResume>(GET_RESUME);
  const [saveResume] = useMutation<SaveResume, SaveResumeVariables>(SAVE_RESUME);
  const [activeTab, setActiveTab] = useState<Tabs>('content');

  // load resume from server
  useEffect(() => {
    getResume();
  }, [getResume]);

  // reset form after loading from server
  useEffect(() => {
    const resume = getResumeResult?.resume;
    if (resume) {
      const { updated_at, created_at, __typename, ...rest } = resume; // eslint-disable-line
      reset(rest);
    }
  }, [reset, getResumeResult]);

  const onSubmit = handleSubmit((data): void => {
    // TODO trim and details list clear
    console.log(data);
    saveResume({ variables: { resumeInput: data } });
  });

  const generatePDF = (): void => {
    const resume = getValues();
    generateResumePDF(resume);
  };

  return (
    <Layout type="editor">
      <div className={style.editor}>
        <div className={style['editor__preview']}>
        </div>
        <div className={style['editor__edit']}>
          <div className={style.tabs}>
            <button disabled={activeTab === 'content'} onClick={() => setActiveTab('content')}>Content</button>
            <button disabled={activeTab === 'style'} onClick={() => setActiveTab('style')}>Style</button>
          </div>
          <div>
            <form onSubmit={onSubmit}>
              <Collapse accordion={false} className={style.collapse} defaultActiveKey="0">
                <CollapsePanel
                  key="0"
                  header="Basic Info"
                  className={style['collapse__item']}
                  forceRender={true}
                >
                  <div>
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
                  header="Other"
                  className={style['collapse__item']}
                  forceRender={true}
                >
                  <SkillForm control={control} register={register} />
                </CollapsePanel>
              </Collapse>

              <div>
                <input type="submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
