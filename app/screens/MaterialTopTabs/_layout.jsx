import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack>
    <Stack.Screen name="foryou" options={{ headerShown: false }} />
    <Stack.Screen name="mydonation" options={{ headerShown: false }} />
    <Stack.Screen name="myrequest" options={{ headerShown: false }} />
   
    </Stack>
  
  )
}

export default _layout

