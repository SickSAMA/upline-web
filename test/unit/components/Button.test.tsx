import { shallow } from 'enzyme';
import React from 'react';

import Button from '@/components/Button';

test('Button', () => {
  const button = shallow(<Button />);

  expect(button).toMatchSnapshot();
});
