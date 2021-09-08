# Code-Push 

## Code-Push implementation process

CodePush is an App Center cloud services that enables React Native developers to deploy mobile app updates directly to their users devices. Its works by acting as a central repository from (using the provided client SDKs). This allows you to have a more deterministic and direct engagement model with your end users while addressing bugs, adding small features that don’t require you to rebuild a binary, or redistributing it through any public app stores.

## Supported React Native Platforms
- iOS (7+)
- Android (4.1+) on TLS 1.2 compatible devices
- Windows (UWP)

## Getting Started

First we need to install react-native-code-push library 

``npm install react-native-code-push``

Note, for targeting both platforms it is recommended to create separate CodePush applications for each platform.

### Android Setup

- [Android configuration for RN >= 0.60v](https://github.com/microsoft/react-native-code-push/blob/master/docs/setup-android.md#plugin-installation-and-configuration-for-react-native-060-version-and-above-android)
- [iOS configuration for RN >= 0.60v](https://github.com/microsoft/react-native-code-push/blob/master/docs/setup-ios.md#plugin-installation-and-configuration-for-react-native-060-version-and-above-ios)

## Plugin Usage
With the CodePush plugin downloaded and linked, and your app asking CodePush where to get the right JS bundle from, the only thing left is to add the necessary code to your app to control the following policies:

- When (and how often) to check for an update? (for example app start, in response to clicking a button in a settings page, periodically at some fixed interval)

- When an update is available, how to present it to the end user?

The simplest way to do this is to "CodePush-ify" your app's root component.

```javascript
import codePush from "react-native-code-push";

let MyApp: () => React$Node = () => {
  ...
}

MyApp = codePush(MyApp);

```
By default, CodePush will check for updates on every app start. If an update is available, it will be silently downloaded, and installed the next time the app is restarted (either explicitly by the end user or by the OS), which ensures the least invasive experience for your end users. If an available update is mandatory, then it will be installed immediately, ensuring that the end user gets it as soon as possible.

If you would like your app to discover updates more quickly, you can also choose to sync up with the CodePush server every time the app resumes from the background. 

```javascript 
let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };

let MyApp: () => React$Node = () => {
}

MyApp = codePush(codePushOptions)(MyApp);
```

lternatively, if you want fine-grained control over when the check happens (like a button press or timer interval), you can call [CodePush.sync()](https://github.com/microsoft/react-native-code-push/blob/master/docs/api-js.md#codepushsync) at any time with your desired SyncOptions, and optionally turn off CodePush's automatic checking by specifying a manual checkFrequency:

```javascript import React from 'react';
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
      <Text>Hello Working</Text>
      <TouchableOpacity onPress={handleOnPress}>
        <Text>Sync CodePushs</Text>
      </TouchableOpacity>
      <Text>Codepush state: {codePushState}</Text>
    </View>
  );
};

export default codePush(codePushOptions)(App);
```
The above code synscs our app with Code Push on every button press and if we have an update its going to be installed after the user confirmation. codePush.sync() provides a callback with an integer that indicates the status. 5 its for up to date status, 6 its for needs to update, etc. Also we have a progress callback that indicates the download progress to handle it.

```javascript
codePush.sync(options: Object, syncStatusChangeCallback: function(syncStatus: Number), downloadProgressCallback: function(progress: DownloadProgress), handleBinaryVersionMismatchCallback: function(update: RemotePackage)): Promise<Number>;
```

### SyncOptions

While the sync method tries to make it easy to perform silent and active updates with little configuration, it accepts an "options" object that allows you to customize numerous aspects of the default behavior mentioned above. The options available are identical to the CodePushOptions, with the exception of the checkFrequency option:

- deploymentKey (String) - Refer to CodePushOptions.

- installMode (codePush.InstallMode) - Refer to CodePushOptions.

- mandatoryInstallMode (codePush.InstallMode) - Refer to CodePushOptions.

- minimumBackgroundDuration (Number) - Refer to CodePushOptions.

- updateDialog (UpdateDialogOptions) - Refer to CodePushOptions.

### SyncStatus
This enum is provided to the syncStatusChangedCallback function that can be passed to the sync method, in order to hook into the overall update process. It includes the following values:

- codePush.SyncStatus.UP_TO_DATE (0) - The app is fully up-to-date with the configured deployment.
- codePush.SyncStatus.UPDATE_INSTALLED (1) - An available update has been installed and will be run either immediately after the syncStatusChangedCallback function returns or the next time the app resumes/restarts, depending on the InstallMode specified in SyncOptions.
- codePush.SyncStatus.UPDATE_IGNORED (2) - The app has an optional update, which the end user chose to ignore. (This is only applicable when the updateDialog is used)
- codePush.SyncStatus.UNKNOWN_ERROR (3) - The sync operation encountered an unknown error.
- codePush.SyncStatus.SYNC_IN_PROGRESS (4) - There is an ongoing sync operation running which prevents the current call from being executed.codePush.SyncStatus
- CHECKING_FOR_UPDATE (5) - The CodePush server is being queried for an update.
- codePush.SyncStatus.AWAITING_USER_ACTION (6) - An update is available, and a confirmation dialog was shown to the end user. (This is only applicable when the updateDialog is used)
- codePush.SyncStatus.DOWNLOADING_PACKAGE (7) - An available update is being downloaded from the CodePush server.
- codePush.SyncStatus.INSTALLING_UPDATE (8) - An available update was downloaded and is about to be installed.

## Releasing Updates
Once your app is configured and distributed to your users, and you have made some JS or asset changes, it's time to release them. The recommended way to release them is using the release-react command in the App Center CLI, which will bundle your JavaScript files, asset files, and release the update to the CodePush server.

NOTE: Before you can start releasing updates, please log into App Center by running the appcenter login command.

In it's the most basic form, this command only requires one parameter: your owner name + "/" + app name.

```appcenter codepush release-react -a <ownerName>/<appName>```