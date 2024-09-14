import { Text, View } from 'react-native'
import React from 'react'
import { Stack } from "expo-router";
import Create from './sign_up/Create';
const _layout = () => {
  return (
    <Stack>
        <Stack.Screen name="Sign Up"options={{
        title: 'Sign Up',
        headerStyle: {
          backgroundColor: '#F42F47',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}/>
        <Stack.Screen name="sign_in" options={{ headerShown: false }} />
        <Stack.Screen name="sign_up" options={{ headerShown: false }} />  
    </Stack>
  )
}

export default _layout
