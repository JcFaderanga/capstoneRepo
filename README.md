# Blood Link

## Table of Contents

- [React Native and Expo Router Installation](#react-native-and-expo-router-installation)
- [NativeWind Installation](#nativewind-installation)
- [Supabase Installation](#supabase-installation)
- [EAS Build](#eas-build)
- [Material Top Navigation](#material-top-navigation)
- [Image Picker](#image-picker)
- [File System for Uploading Images to Supabase Storage](#file-system-for-uploading-images-to-supabase-storage)

## React Native and Expo Router Installation

### [Installation Documentation](https://docs.expo.dev/router/installation/#prerequisites)

- `npx create-expo-app@latest [your-app-name] --template blank@latest`
- `npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar`

## NativeWind Installation

### [Installation Documentation](https://www.nativewind.dev/quick-starts/expo)

- `npm install nativewind`
- `npm install --save-dev tailwindcss@3.3.2`

## Supabase Installation

### [Installation Documentation](https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native)

- `npx expo install @supabase/supabase-js @react-native-async-storage/async-storage @rneui/themed`

## EAS Build

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
