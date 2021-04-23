/* eslint-disable camelcase */
import React from 'react';
import { Control, useFieldArray, UseFormRegister } from 'react-hook-form';

import { Field } from '@/components/Form';
import IconArrowDown from '@/components/SVG/arrowDownStick.svg';
import IconArrowUp from '@/components/SVG/arrowUpStick.svg';
import IconDelete from '@/components/SVG/bin.svg';
import { SkillInput } from '@/graphql/types/graphql-global-types';

import style from '../style.module.scss';
import { ResumeFormData } from './ResumeEditor';

interface SkillFormProps {
  control: Control<ResumeFormData>;
  register: UseFormRegister<ResumeFormData>;
}

const defaultSkill: SkillInput = {
  key: '',
  value: '',
};

export default function SkillForm({ control, register }: SkillFormProps): JSX.Element {
  const { fields, append, remove, swap } = useFieldArray({
    control,
    name: 'others',
  });

  return (
    <div>
      {
        fields.map((skill, index) => (
          <div className={style.section} key={skill.id}>
            <div className={style.sectionHeader}>
              <div className={style['sectionHeader__bg']} />
              {
                index > 0 && (
                  <button className={style['sectionHeader__button']} onClick={() => swap(index, index - 1)} type="button" title="move up">
                    <IconArrowUp />
                  </button>
                )
              }
              {
                index < fields.length - 1 && (
                  <button className={style['sectionHeader__button']} onClick={() => swap(index, index + 1)} type="button" title="move down">
                    <IconArrowDown />
                  </button>
                )
              }
              <button className={style['sectionHeader__button']} onClick={() => remove(index)} type="button" title="delete">
                <IconDelete />
              </button>
            </div>
            <div className={style.row}>
              <Field className={style['col-12']} label="Name">
                <input type="text" {...register(`others.${index}.key` as const)} defaultValue={skill.key} />
              </Field>
            </div>
            <div className={style.row}>
              <Field className={style['col-12']} label="Detail">
                <input type="text" {...register(`others.${index}.value` as const)} defaultValue={skill.value} />
              </Field>
            </div>
          </div>
        ))
      }
      <div className={style.sectionAdd}>
        <button type="button" onClick={() => append(defaultSkill)}>Add</button>
      </div>
    </div>
  );
}
