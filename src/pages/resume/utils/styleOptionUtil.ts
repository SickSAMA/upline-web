import { SelectOption } from '@/components/Form';

const styleOptions = {
  font_family: {
    options: [
      { value: 'Arial', label: 'Arial' },
      { value: 'Times New Roman', label: 'Times New Roman' },
    ],
    defaultIndex: 0,
  },
  font_size: {
    options: [
      { value: '10', label: '10pt' },
      { value: '11', label: '11pt' },
      { value: '12', label: '12pt' },
    ],
    defaultIndex: 1,
  },
  line_height: {
    options: [
      { value: '1', label: '1' },
      { value: '1.15', label: '1.15' },
      { value: '1.5', label: '1.5' },
      { value: '2', label: '2' },
    ],
    defaultIndex: 0,
  },
  margin: {
    options: [
      // value: 'left top right bottom'
      { value: '72 72 72 72', label: 'Normal' },
      { value: '36 36 36 36', label: 'Narrow' },
      { value: '54 72 54 72', label: 'Moderate' },
    ],
    defaultIndex: 0,
  },
  header_alignment: {
    options: [
      { value: 'left', label: 'Left' },
      { value: 'center', label: 'Center' },
    ],
    defaultIndex: 1,
  },
};

export type HeaderAlignment = 'left' | 'center';

export function getStyleOptions(styleName: string): SelectOption[] {
  if (!styleOptions[styleName]) {
    throw new Error('The style name provide is not valid');
  }
  return styleOptions[styleName].options;
}

export function getDefaultStyleOption(styleName: string): SelectOption {
  const targetOptions = styleOptions[styleName];
  if (!targetOptions) {
    throw new Error('The style name provide is not valid');
  }
  return targetOptions.options[targetOptions.defaultIndex];
}

export function getSelectedOptionFromValue(styleName: string, value: string): SelectOption {
  const targetOptions = styleOptions[styleName];
  if (!targetOptions) {
    throw new Error('The style name provide is not valid');
  }

  const targetOption = targetOptions.options.find((o: SelectOption) => o.value === value);
  if (!targetOption) {
    throw new Error('Can not find the value provided in the options');
  }

  return targetOption;
}
