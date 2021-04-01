import { gql, useLazyQuery } from '@apollo/client';
import React, { FC } from 'react';

import Layout from '@/components/Layout';
import { Skeleton, SkeletonCol, SkeletonRow } from '@/components/Skeleton';

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
        <Skeleton>
          <SkeletonCol col={12}>
            <SkeletonRow>
              <SkeletonCol col={6} big />
              <SkeletonCol col={4} empty big />
              <SkeletonCol col={2} big />
              <SkeletonCol col={4} />
              <SkeletonCol col={8} empty />
              <SkeletonCol col={6} />
              <SkeletonCol col={6} empty />
              <SkeletonCol col={12} />
            </SkeletonRow>
          </SkeletonCol>
        </Skeleton>
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
