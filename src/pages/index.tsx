import React, { FC, useCallback } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { getCurrentUser } from '@/libs/auth';

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

  const logout = useCallback(
      () => {
        const currentUser = getCurrentUser();
        if (currentUser) {
          currentUser.signOut();
          location.reload();
        }
      },
      [],
  );

  return (
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
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;
