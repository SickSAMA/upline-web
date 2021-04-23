import { gql, useLazyQuery } from '@apollo/client';
import React, { FC } from 'react';

import Layout from '@/components/Layout';
import useTimer from '@/utils/useTimer';

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
  const { start: startTimer, reset: resetTimer, pause: pauseTimer, time, status } = useTimer({
    autostart: false,
    startTime: 60,
    endTime: 0,
    step: 1,
    timerType: 'DEC',
  });

  return (
    <Layout>
      <div>
        <div>
          <button onClick={startTimer}>Start Timer</button>
          <button onClick={pauseTimer}>Pause Timer</button>
          <button onClick={resetTimer}>Reset Timer</button>
          <span>{time}</span>
          <span>{status}</span>
        </div>
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
