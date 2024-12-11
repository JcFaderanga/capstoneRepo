# Blood Link

## Table of Contents

- [React Native and Expo Router Installation](#react-native-and-expo-router-installation)
- [NativeWind Installation](#nativewind-installation)
- [Supabase Installation](#supabase-installation)
- [EAS Build](#eas-build)
- [Material Top Navigation](#material-top-navigation)
- [Image Picker](#image-picker)
- [File System for Uploading Images to Supabase Storage](#file-system-for-uploading-images-to-supabase-storage)
- [Philippines address](#Philippines-address)
- [Date Picker](#date-picker)

## React Native and Expo Router Installation

### [Installation Documentation](https://docs.expo.dev/router/installation/#prerequisites)

- `npx create-expo-app@latest [your-app-name] --template blank@latest`
- `npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar`

## NativeWind Installation

### [Installation Documentation v.2](https://www.nativewind.dev/quick-starts/expo)

- `npm install nativewind`
- `npm install --save-dev tailwindcss@3.3.2`

### [Installation Documentation v.4 latest](https://www.nativewind.dev/getting-started/expo-router#installation)

- `npm install nativewind tailwindcss react-native-reanimated react-native-safe-area-context`
- `npx tailwindcss init`
- `npx expo customize metro.config.js`

## Extend babel.config.js

-`npx expo customize`

## Supabase Installation

### [Installation Documentation](https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native)

- `npx expo install @supabase/supabase-js @react-native-async-storage/async-storage @rneui/themed`
- `npm install react-native-url-polyfill`

## EAS Build

### [Installation and doplyment tutorial](https://www.youtube.com/watch?v=4hw_UehVBAU&list=PLCn4foV7_u7A96yEugfr_GKMsT-1-I_L2)

- `npm install -g eas-cli`
- `eas login` (if not already logged in)
- `eas logout` (to logout)
- `eas build:configure`
- `eas build -p android --profile preview`

## Material Top Navigation

- `npm i @react-navigation/material-top-tabs`

## Image Picker

- `npx expo install expo-image-picker`

## File System for Uploading Images to Supabase Storage

- `npx expo install expo-file-system`
- `npm i base64-arraybuffer`

## Philippines address

- `npm install phil-reg-prov-mun-brgy`

## Date Picker

- `npm install @react-native-community/datetimepicker`
- `npm install react-native-modal-datetime-picker`
- `npm install react-native-picker-select`

## Bottom Sheet

### [Installation Document](https://gorhom.dev/react-native-bottom-sheet/)

- `npm i @gorhom/bottom-sheet`
- `npx expo install react-native-reanimated react-native-gesture-handler`
- `npm install --save react-native-gesture-handler`
