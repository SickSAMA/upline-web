import { gql, useLazyQuery } from '@apollo/client';
import React, { FC } from 'react';

import Layout from '@/components/Layout';

const GET_RECIPE = gql`
  query GetRecipe {
    recipe(recipeId: 2) {
      id
      title
      description
      ratings {
        id
        value
        date
      }
      author {
        username
      }
    }
  }
`;

const Home: FC<null> = () => {
  const [getRecipe, { loading, error, data }] = useLazyQuery(GET_RECIPE);

  return (
    <Layout>
      <div>
        {
          loading && <div>Loading...</div>
        }
        {
          error && <div>Error! ${error.message}</div>
        }
        {
          data &&
            <div>
              <label>Recipe Title: </label>
              <span>{ data.recipe.title }</span>
            </div>
        }
        <button onClick={() => getRecipe()}>Fetch Recipe</button>
      </div>
    </Layout>
  );
};

export default Home;
