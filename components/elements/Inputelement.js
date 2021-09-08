import React, {useContext} from 'react';
import {FormContext} from '../../FormContext';
import {Input} from 'native-base';

const InputElement = ({
  field_type,
  field_id,
  field_label,
  field_placeholder,
  field_value,
}) => {
  const {handleChange} = useContext(FormContext);

  return (
    <Input
      w="100%"
      mx={3}
      placeholder={field_placeholder}
      onChange={e => handleChange(field_id, e)}
      value={field_value}
    />
  );
};

export default InputElement;
