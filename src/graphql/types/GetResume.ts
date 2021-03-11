/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetResume
// ====================================================

export interface GetResume_resume_education {
  __typename: "Experience";
  entity: string;
  city: string;
  country: string;
  summary: string;
  start_date: string;
  end_date: string;
  details: (string | null)[];
}

export interface GetResume_resume_professional_experience {
  __typename: "Experience";
  entity: string;
  city: string;
  country: string;
  summary: string;
  start_date: string;
  end_date: string;
  details: (string | null)[];
}

export interface GetResume_resume_leadership_experience {
  __typename: "Experience";
  entity: string;
  city: string;
  country: string;
  summary: string;
  start_date: string;
  end_date: string;
  details: (string | null)[];
}

export interface GetResume_resume_others {
  __typename: "Skill";
  key: string;
  value: string;
}

export interface GetResume_resume {
  __typename: "Resume";
  uuid: string;
  owner: string;
  name: string;
  english_name: string;
  phone: string;
  email: string;
  address: string;
  education: (GetResume_resume_education | null)[];
  professional_experience: (GetResume_resume_professional_experience | null)[];
  leadership_experience: (GetResume_resume_leadership_experience | null)[];
  others: (GetResume_resume_others | null)[];
  updated_at: any;
  created_at: any;
}

export interface GetResume {
  resume: GetResume_resume | null;
}
