/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ResumeInput } from "./graphql-global-types";

// ====================================================
// GraphQL mutation operation: SaveResume
// ====================================================

export interface SaveResume_saveResume {
  __typename: "Resume";
  uuid: string;
}

export interface SaveResume {
  saveResume: SaveResume_saveResume;
}

export interface SaveResumeVariables {
  resumeInput: ResumeInput;
}
