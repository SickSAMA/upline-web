import { gql } from '@apollo/client';

export default gql`
  query GetResume {
    resume(uuid: "40833336-0507-4cd2-a79b-9b4a1affc920") {
      uuid
      owner
      name
      owner
      english_name
      phone
      email
      address
      education {
        entity
        city
        country
        summary
        start_date
        end_date
        details
      }
      professional_experience {
        entity
        city
        country
        summary
        start_date
        end_date
        details
      }
      leadership_experience {
        entity
        city
        country
        summary
        start_date
        end_date
        details
      }
      others {
        key
        value
      }
      updated_at
      created_at
    }
  }
`;
