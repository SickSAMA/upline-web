/* eslint-disable camelcase */
import React from 'react';
import { Control, useFieldArray, UseFormRegister } from 'react-hook-form';

import { Field } from '@/components/Form';
import IconArrowDown from '@/components/SVG/arrowDownStick.svg';
import IconDelete from '@/components/SVG/bin.svg';
import { ExperienceInput } from '@/graphql/types/graphql-global-types';

import style from '../style.module.scss';
import { ResumeFormData } from './ResumeEditor';

interface ExperienceFeildNameMapping {
  entity: string; // eg: 'University'
  summary: string; // eg: 'Degree name'
  details: string; // eg: 'Achievements'
}

interface ExperienceFormProps {
  control: Control<ResumeFormData>;
  register: UseFormRegister<ResumeFormData>;
  type: 'education' | 'leadership_experience' | 'professional_experience'; // used to data access key
  fieldNameMapping: ExperienceFeildNameMapping;
}

const defaultExperience: ExperienceInput = {
  entity: '',
  city: '',
  country: '',
  summary: '',
  start_date: '',
  end_date: '',
  details: '',
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
          <div className={style.section} key={experience.id}>
            <div className={style.sectionHeader}>
              <div className={style['sectionHeader__bg']} />
              <button className={style['sectionHeader__button']} type="button">
                <IconArrowDown />
              </button>
              <button className={style['sectionHeader__button']} onClick={() => remove(index)} type="button">
                <IconDelete />
              </button>
            </div>
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
                <textarea {...register(`${type}.${index}.details` as const)} defaultValue={experience.details} />
              </Field>
            </div>
          </div>
        ))
      }
      <div className={style.sectionAdd}>
        <button type="button" onClick={() => append(defaultExperience)}>Add</button>
      </div>
    </div>
  );
}
