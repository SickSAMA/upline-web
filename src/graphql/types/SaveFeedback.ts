/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FeedbackInput } from "./graphql-global-types";

// ====================================================
// GraphQL mutation operation: SaveFeedback
// ====================================================

export interface SaveFeedback_saveFeedback {
  __typename: "Feedback";
  name: string;
}

export interface SaveFeedback {
  saveFeedback: SaveFeedback_saveFeedback;
}

export interface SaveFeedbackVariables {
  feedbackInput: FeedbackInput;
}
