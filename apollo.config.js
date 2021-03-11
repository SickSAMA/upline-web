// use local env as schema download and generation is only for development
require('dotenv').config({ path: '.env.local' });

module.exports = {
  client: {
    service: {
      url: process.env.NEXT_PUBLIC_API_ENDPOINT,
    },
    includes: ['./src/**/*.ts'],
    tagName: 'gql',
    addTypename: true,
  },
};
