/* eslint-disable camelcase */
import React from 'react';

import {
  GetResume_resume_education,
  GetResume_resume_leadership_experience,
  GetResume_resume_professional_experience,
} from '@/graphql/types/GetResume';

import style from '../style.module.scss';

interface ExperienceProps {
  experience: GetResume_resume_education | GetResume_resume_leadership_experience | GetResume_resume_professional_experience;
}

export default function Experience({ experience }: ExperienceProps): JSX.Element {
  return (
    <div className={style.experience}>
      {
        (experience.entity || experience.city || experience.country) &&
          <p className={style['resumeExperience__entity']}>
            { experience.entity && <span>{ experience.entity }</span>}
            {
              (experience.city || experience.country) &&
                <span>
                  { [experience.city, experience.country].filter((s) => s).join(', ')}
                </span>
            }
          </p>
      }
      {
        (experience.summary || experience.start_date || experience.end_date) &&
          <p className={style['resumeExperience__summary']}>
            { experience.summary && <span>{ experience.summary }</span>}
            {
              (experience.start_date || experience.end_date) &&
                <span>
                  { [experience.start_date, experience.end_date].filter((s) => s).join(' - ')}
                </span>
            }
          </p>
      }
      {
        experience.details.length > 0 &&
          <ul>
            { experience.details.map((detail, index) => <li key={index}>{ detail }</li>) }
          </ul>
      }
    </div>
  );
}
