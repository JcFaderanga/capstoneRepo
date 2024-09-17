import { Text, View } from 'react-native'
import React from 'react'
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack>
         <Stack.Screen name="PhoneNumber" options={{
            title: 'Sign Up',
            headerStyle: {
              backgroundColor: '#F42F47',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        /> 
         <Stack.Screen name="Profile" options={{
            title: 'Sign Up',
            headerStyle: {
              backgroundColor: '#F42F47',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />  
        <Stack.Screen name="bloodType" options={{
            title: 'Sign Up',
            headerStyle: {
              backgroundColor: '#F42F47',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        /> 
        <Stack.Screen name="Create" options={{
            title: 'Sign Up',
            headerStyle: {
              backgroundColor: '#F42F47',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        /> 
        <Stack.Screen name="gender" options={{
            title: 'Sign Up',
            headerStyle: {
              backgroundColor: '#F42F47',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        /> 
    </Stack>
  )
}

export default _layout
