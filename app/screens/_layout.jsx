import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

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
       <Stack.Screen name="editProfileInfo"
       options={{
        title: 'Update Profile',
        headerStyle: {
          backgroundColor: '#F42F47',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
          color: 'white',
        },
      }}
       />  
      <Stack.Screen name="findDonor"
       options={{
        title: 'Find Donor',
        headerStyle: {
          backgroundColor: '#F42F47',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
          color: 'white',
        },
      }}
       /> 
       <Stack.Screen name="donationDrive"
       options={{
        title: 'Donation Drive',
        headerStyle: {
          backgroundColor: '#F42F47',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
          color: 'white',
        },
      }}
       /> 
    <Stack.Screen name="FAQsPages" options={{ headerShown: false }} />
    <Stack.Screen name="MaterialTopTabs" options={{ headerShown: false }} />
    </Stack>
  
  )
}

export default _layout

