import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Stack, usePathname, useRouter } from "expo-router";
import { AuthProvider,useAuth } from '../../context/authContext';
import { supabase } from '../../lib/supabase';

const _layout = () => {
  return ( 
      <Stack>
        <Stack.Screen name="profile__tab"options={{
          title: 'Update Profile',
          headerStyle: {
            backgroundColor: '#F42F47',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
            }}/>
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
          }}/>
           <Stack.Screen name="FAQs"
          options={{
            title: 'FAQs',
            headerStyle: {
              backgroundColor: '#F42F47',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
          }}/>
          <Stack.Screen name="myRequestList"
            options={{
              title: 'My Requests',
              headerStyle: {
                backgroundColor: '#F42F47',
              },
              headerTintColor: '#fff',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
              },
          }}/>

      <Stack.Screen name="donate"
            options={{
              title: '',
              headerStyle: {
                backgroundColor: '#F42F47',
              },
              headerTintColor: '#fff',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
              },
          }}/>
          <Stack.Screen name="donationHistory"
            options={{
              title: 'history',
              headerStyle: {
                backgroundColor: '#F42F47',
              },
              headerTintColor: '#fff',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
              },
          }}/>
          <Stack.Screen name="donationSettings"
            options={{
              title: 'Donation Settings',
              headerStyle: {
                backgroundColor: '#F42F47',
              },
              headerTintColor: '#fff',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
              },
          }}/>
        <Stack.Screen name="request_materialtop" options={{ headerShown: false }} /> 
        <Stack.Screen name="viewRequest" options={{ headerShown: false }} /> 
        <Stack.Screen name="FAQsPages" options={{ headerShown: false }} /> 
     
      </Stack>  
  )
}

export default _layout