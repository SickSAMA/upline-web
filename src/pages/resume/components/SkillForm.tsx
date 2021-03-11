/* eslint-disable camelcase */
import React from 'react';
import { Control, useFieldArray, UseFormRegister } from 'react-hook-form';

import { Field } from '@/components/Form';
import { ResumeInput, SkillInput } from '@/graphql/types/graphql-global-types';

import style from '../style.module.scss';

interface SkillFormProps {
  control: Control<ResumeInput>;
  register: UseFormRegister<ResumeInput>;
}

const defaultSkill: SkillInput = {
  key: '',
  value: '',
};

export default function SkillForm({ control, register }: SkillFormProps): JSX.Element {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'others',
  });

  return (
    <div>
      {
        fields.map((skill, index) => (
          <div key={skill.id}>
            <div className={style.row}>
              <Field className={style['col-6']} label="Name">
                <input type="text" {...register(`others.${index}.key` as const)} defaultValue={skill.key} />
              </Field>
              <Field className={style['col-6']} label="Value">
                <input type="text" {...register(`others.${index}.value` as const)} defaultValue={skill.value} />
              </Field>
            </div>
            <button type="button" onClick={() => remove(index)}>Delete</button>
          </div>
        ))
      }
      <button type="button" onClick={() => append(defaultSkill)}>Add</button>
    </div>
  );
}
