import React from 'react';
import CheckboxElement from './elements/CheckboxElement';
import InputElement from './elements/Inputelement';
import SelectorElement from './elements/SelectorElement';
import {Text} from 'react-native';

const Element = ({
  field: {
    field_type,
    field_id,
    field_label,
    field_placeholder,
    field_value,
    field_options,
  },
}) => {
  switch (field_type) {
    case 'text':
      return (
        <InputElement
          field_id={field_id}
          field_placeholder={field_placeholder}
          field_value={field_value}
        />
      );
    case 'checkbox':
      return <CheckboxElement />;
    case 'select':
      return (
        <SelectorElement
          field_id={field_id}
          field_label={field_label}
          field_placeholder={field_placeholder}
          field_value={field_value}
          field_options={field_options}
        />
      );
    default:
      return <Text>'element'</Text>;
  }
};

export default Element;
