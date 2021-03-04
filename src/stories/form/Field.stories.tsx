// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { Field as FieldComponent, FieldProps } from '../../components/Form';

export default {
  title: 'Form/Field',
  component: FieldComponent,
  decorators: [(Story) => <div style={{ width: '20rem' }}><Story/></div>],
} as Meta;

export const Field: Story<FieldProps> = (args) => {
  if (!args.label) {
    args.label = 'Field Name';
  }

  return (
    <>
      <div className="row">
        <FieldComponent {...args}>
          <input type="text" placeholder="This an example" />
        </FieldComponent>
      </div>
      <div className="row">
        <FieldComponent {...args}>
          <input type="text" value="This an example" disabled />
        </FieldComponent>
      </div>
      <div className="row">
        <FieldComponent {...args}>
          <input type="password" value="This an example" />
        </FieldComponent>
      </div>
      <div className="row">
        <FieldComponent {...args}>
          <input type="file" />
        </FieldComponent>
      </div>
      <div className="row">
        <FieldComponent {...args}>
          <input type="color" />
        </FieldComponent>
      </div>
      <div className="row">
        <FieldComponent {...args}>
          <textarea />
        </FieldComponent>
      </div>
    </>
  );
};
