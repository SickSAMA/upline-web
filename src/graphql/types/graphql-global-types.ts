/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface ExperienceInput {
  entity: string;
  city: string;
  country: string;
  summary: string;
  start_date: string;
  end_date: string;
  details: (string | null)[];
}

export interface ResumeInput {
  uuid?: string | null;
  owner?: string | null;
  name?: string | null;
  english_name?: string | null;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  education: (ExperienceInput | null)[];
  professional_experience: (ExperienceInput | null)[];
  leadership_experience: (ExperienceInput | null)[];
  others: (SkillInput | null)[];
}

export interface SkillInput {
  key: string;
  value: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
