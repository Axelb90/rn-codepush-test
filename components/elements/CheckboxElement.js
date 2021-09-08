import React from 'react';
import {Checkbox} from 'native-base';

const CheckboxElement = () => {
  const [groupValues, setGroupValues] = React.useState([]);
  return (
    <Checkbox.Group onChange={setGroupValues} value={groupValues}>
      <Checkbox accessibilityLabel="one" value="one" my={2}>
        One
      </Checkbox>
      <Checkbox accessibilityLabel="two" value="two">
        Two
      </Checkbox>
    </Checkbox.Group>
  );
};

export default CheckboxElement;
