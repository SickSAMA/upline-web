import { gql } from '@apollo/client';

export default gql`
  mutation SaveFeedback($feedbackInput: FeedbackInput!) {
    saveFeedback(feedback: $feedbackInput) {
      name
    }
  }
`;
