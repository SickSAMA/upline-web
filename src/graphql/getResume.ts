import { gql } from '@apollo/client';

export default gql`
  query GetResume($uuid: String!) {
    resume(uuid: $uuid) {
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
