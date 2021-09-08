import React, {useContext} from 'react';
import {FormContext} from '../../FormContext';
import {Select, VStack, CheckIcon} from 'native-base';

const SelectorElement = ({
  field_type,
  field_id,
  field_label,
  field_placeholder,
  field_value,
  field_options,
}) => {
  const [language, setLanguage] = React.useState('');
  const {handleChange} = useContext(FormContext);

  return (
    <VStack alignItems="center" space={4}>
      <Select
        selectedValue={field_value}
        minWidth={200}
        accessibilityLabel="Select your favorite programming language"
        placeholder="Select your favorite programming language"
        onValueChange={itemValue => {
          handleChange(field_id, itemValue);
        }}
        _selectedItem={{
          bg: 'cyan.600',
          endIcon: <CheckIcon size={4} />,
        }}>
        {field_options
          ? field_options.map((option, i) => (
              <Select.Item
                key={i}
                label={option.option_label}
                value={option.option_label}
              />
            ))
          : null}
      </Select>
    </VStack>
  );
};

export default SelectorElement;
