/* eslint-disable camelcase */
import React from 'react';
import { Control, useFieldArray, UseFormRegister } from 'react-hook-form';

import { Field } from '@/components/Form';
import { ExperienceInput, ResumeInput } from '@/graphql/types/graphql-global-types';

import style from '../style.module.scss';

interface ExperienceFeildNameMapping {
  entity: string; // eg: 'University'
  summary: string; // eg: 'Degree name'
  details: string; // eg: 'Achievements'
}

interface ExperienceFormProps {
  control: Control<ResumeInput>;
  register: UseFormRegister<ResumeInput>;
  type: 'education' | 'leadership_experience' | 'professional_experience'; // used to data access key
  fieldNameMapping: ExperienceFeildNameMapping;
}

function convertArrayToString(arr: (string | null)[]): string {
  return arr.filter((s) => s).join('\n');
}

function convertStringToArray(str: string): string[] {
  return str.split('\n');
}

const defaultExperience: ExperienceInput = {
  entity: '',
  city: '',
  country: '',
  summary: '',
  start_date: '',
  end_date: '',
  details: [],
};

export default function ExperienceForm({ control, register, type, fieldNameMapping }: ExperienceFormProps): JSX.Element {
  const { fields, append, remove } = useFieldArray(
      {
        control,
        name: type,
      },
  );

  return (
    <div>
      {
        fields.map((experience, index) => (
          <div key={experience.id}>
            <div className={style.row}>
              <Field className={style['col-6']} label={fieldNameMapping.entity}>
                <input type="text" {...register(`${type}.${index}.entity` as const)} defaultValue={experience.entity} />
              </Field>
              <Field className={style['col-3']} label="City">
                <input type="text" {...register(`${type}.${index}.city` as const)} defaultValue={experience.city} />
              </Field>
              <Field className={style['col-3']} label="Country">
                <input type="text" {...register(`${type}.${index}.country` as const)} defaultValue={experience.country} />
              </Field>
            </div>
            <div className={style.row}>
              <Field className={style['col-6']} label={fieldNameMapping.summary}>
                <input type="text" {...register(`${type}.${index}.summary` as const)} defaultValue={experience.summary} />
              </Field>
              <Field className={style['col-3']} label="Start Date">
                <input type="text" {...register(`${type}.${index}.start_date` as const)} defaultValue={experience.start_date} />
              </Field>
              <Field className={style['col-3']} label="End Date">
                <input type="text" {...register(`${type}.${index}.end_date` as const)} defaultValue={experience.end_date} />
              </Field>
            </div>
            <div className={style.row}>
              <Field className={style['col-12']} label={fieldNameMapping.details}>
                <textarea {...register(`${type}.${index}.details` as const, { setValueAs: convertStringToArray })} defaultValue={convertArrayToString(experience.details)} />
              </Field>
            </div>
            <button type="button" onClick={() => remove(index)}>Delete</button>
          </div>
        ))
      }
      <button type="button" onClick={() => append(defaultExperience)}>Add</button>
    </div>
  );
}
