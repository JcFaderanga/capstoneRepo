import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack>
       <Stack.Screen name="Settings"
       options={{
        title: 'Settings',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
          color: '#F42F47',
        },
      }}
       />  
    </Stack>
  
  )
}

export default _layout

