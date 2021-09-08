import React, {useEffect} from 'react';
import codePush from 'react-native-code-push';

import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import {useForm, Controller, FormProvider} from 'react-hook-form';
import {NativeBaseProvider} from 'native-base';
import formJSON from './source/formJSON';
import Element from './components/Element';
import {FormContext} from './FormContext';

let codePushOptions = {checkFrequency: codePush.CheckFrequency.MANUAL};
const App = () => {
  const [codePushState, setCodePushState] = React.useState(0);
  const [elements, setElements] = React.useState(null);
  const {
    control,

    formState: {errors},
  } = useForm();
  const onSubmit = data => console.log(data);

  const handleOnPress = () => {
    codePush.sync(
      {
        updateDialog: true,
        installMode: codePush.InstallMode.IMMEDIATE,
      },
      res => {
        console.log(res);
        setCodePushState(res);
      },
    );
  };

  useEffect(() => {
    setElements(formJSON[0]);
  }, []);

  const {fields, page_label} = elements ?? {};

  const handleSubmit = () => {
    console.log(elements);
  };

  const handleChange = (id, event) => {
    const newElements = {...elements};

    newElements.fields.map(field => {
      const {field_type, field_id, field_value} = field;
      if (id === field_id) {
        switch (field_type) {
          case 'checkbox':
            field['field_value'] = event.target.checked;
          case 'select':
            console.log('es select:', event);
            field['field_value'] = event;
          case 'text':
            field['field_value'] = event?.target?.value;
          default:
            break;
        }
      }
      setElements(newElements);
    });
    console.log(elements);
    console.log('hanldeChange');
  };

  return (
    <NativeBaseProvider>
      <FormContext.Provider value={{handleChange}}>
        <View>
          <Text>Hello world</Text>
          <Text>Hello Working</Text>
          <TouchableOpacity onPress={handleOnPress}>
            <Text>Sync CodePushs</Text>
          </TouchableOpacity>
          <Text>Codepush state: {codePushState}</Text>
          <View>
            <Controller
              control={control}
              rules={{required: true}}
              render={({field: {onChange, onBlur, value}}) => {
                return (
                  <TextInput
                    style={{backgroundColor: '#FFBBBB'}}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                );
              }}
            />
          </View>
        </View>
        <View>
          <View>
            <Text>{page_label}</Text>
          </View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => {
              {
                return fields
                  ? fields.map((field, i) => <Element key={i} field={field} />)
                  : null;
              }
            }}
            name="firstName"
            defaultValue=""
          />
          {errors.firstName && <Text>This is required.</Text>}

          <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
      </FormContext.Provider>
    </NativeBaseProvider>
  );
};

export default codePush(codePushOptions)(App);
