/* eslint-disable camelcase */
import { useLazyQuery, useMutation } from '@apollo/client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Field } from '@/components/Form';
import Layout from '@/components/Layout';
import GET_RESUME from '@/graphql/getResume';
import SAVE_RESUME from '@/graphql/saveResume';
import { GetResume } from '@/graphql/types/GetResume';
import { ResumeInput } from '@/graphql/types/graphql-global-types';
import { SaveResume, SaveResumeVariables } from '@/graphql/types/SaveResume';

import ExperienceForm from './components/ExperienceForm';
import SkillForm from './components/SkillForm';
import style from './style.module.scss';

export default function ResumeEditor(): JSX.Element {
  // todo
  const { register, handleSubmit, reset, control } = useForm<ResumeInput>();
  const [getResume, { data: getResumeResult }]= useLazyQuery<GetResume>(GET_RESUME);
  const [saveResume] = useMutation<SaveResume, SaveResumeVariables>(SAVE_RESUME);

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
    console.log(data);
    saveResume({ variables: { resumeInput: data } });
  });

  return (
    <Layout>
      <div className={style.container}>
        <div className={style.preview}>

        </div>
        <div className={style.editor}>
          <form className={style.rowWrapper} onSubmit={onSubmit}>
            <h2>Basic Info</h2>
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

            <h2>Education</h2>
            <ExperienceForm
              control={control}
              register={register}
              type="education"
              fieldNameMapping={{
                entity: 'University',
                summary: 'Degree Name',
                details: 'Achievements',
              }} />

            <h2>Professional Experience</h2>
            <ExperienceForm
              control={control}
              register={register}
              type="professional_experience"
              fieldNameMapping={{
                entity: 'Company',
                summary: 'Division, Position',
                details: 'Achievements',
              }} />

            <h2>Leadership & Extracurricular Activities</h2>
            <ExperienceForm
              control={control}
              register={register}
              type="leadership_experience"
              fieldNameMapping={{
                entity: 'Organization/Competition Name',
                summary: 'Position',
                details: 'Achievements',
              }} />

            <h2>Others</h2>
            <SkillForm control={control} register={register} />
            <div>
              <input type="submit" />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
