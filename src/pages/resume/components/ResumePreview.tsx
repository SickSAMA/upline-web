import React from 'react';

import style from '../style.module.scss';
import Experience from './Experience';
import { ResumeFormData } from './ResumeEditor';

interface ResumePreviewProps {
  resume: ResumeFormData;
}

export default function ResumePreview({ resume }: ResumePreviewProps): JSX.Element | null {
  return (
    <div id="resume" className={style.resume}>
      <div className={style['resume__header']}>
        {
          (resume.name || resume.english_name) &&
            <h1>
              { [resume.name, resume.english_name].filter((s) => s).join(', ')}
            </h1>
        }
        {
          (resume.phone || resume.email) &&
            <p>
              { resume.phone && <><b>Phone:</b> {resume.phone}</> }
              { (resume.phone && resume.email) && ' ' }
              { resume.email && <><b>Email:</b> {resume.email}</> }
            </p>
        }
        {
          resume.address &&
            <p><b>Address:</b> {resume.address}</p>
        }
      </div>

      {
        resume.education.length > 0 &&
          <div className={style['resume__section']}>
            <h2>Education</h2>
            {
              resume.education.map((experience, index) => (
                <Experience key={index} experience={experience} />
              ))
            }
          </div>
      }

      {
        resume.professional_experience.length > 0 &&
          <div className={style['resume__section']}>
            <h2>Professional Experience</h2>
            {
              resume.professional_experience.map((experience, index) => (
                <Experience key={index} experience={experience} />
              ))
            }
          </div>
      }

      {
        resume.leadership_experience.length > 0 &&
          <div className={style['resume__section']}>
            <h2>Leadership & Extracurricular Activities</h2>
            {
              resume.leadership_experience.map((experience, index) => (
                <Experience key={index} experience={experience} />
              ))
            }
          </div>
      }

      {
        resume.others.length > 0 &&
          <div className={style['resume__section']}>
            <h2>Others</h2>
            {
              resume.others.map((skill, index) => (
                <p key={index}>
                  { skill.key && <b>{ skill.key }</b> }
                  { (skill.key && skill.value) && <b>: </b> }
                  { skill.value ?? '' }
                </p>
              ))
            }
          </div>
      }
    </div>
  );
}
