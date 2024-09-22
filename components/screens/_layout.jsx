import { StyleSheet, Text, View, Button } from 'react-native'
import React,{useEffect}from 'react'
import { Stack, useRouter } from 'expo-router'
import { AuthProvider,useAuth } from '../../context/authContext';
const _layout = () => {
 
  return (
   
    <Stack>
       <Stack.Screen name="Settings"
       options={{
        title: 'Settings',
        headerStyle: {
          backgroundColor: '#F42F47',
        },
        headerTintColor: '#fff',
        headerTitleAlign: '',
        headerTitleStyle: {
          fontWeight: 'bold',
          color: 'white',
        },
      }}
       />   
       <Stack.Screen name="FAQs"
       options={{
        title: 'FAQs',
        headerStyle: {
          backgroundColor: '#F42F47',
        },
        headerTintColor: '#fff',
        headerTitleAlign: '',
        headerTitleStyle: {
          fontWeight: 'bold',
          color: 'white',
        },
      }}
       />  

    <Stack.Screen name="FAQsPages" options={{ headerShown: false }} />
    </Stack>
   
  )
}

export default _layout

