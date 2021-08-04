/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import codePush from 'react-native-code-push';

import {Text, TouchableOpacity, View} from 'react-native';

let codePushOptions = {checkFrequency: codePush.CheckFrequency.MANUAL};
const App = () => {
  const [codePushState, setCodePushState] = React.useState(0);
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
  return (
    <View>
      <Text>Hello world</Text>
      <TouchableOpacity onPress={handleOnPress}>
        <Text>Sync CodePushs</Text>
      </TouchableOpacity>
      <Text>Codepush state: {codePushState}</Text>
    </View>
  );
};

export default codePush(codePushOptions)(App);
