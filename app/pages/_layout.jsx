import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Stack, usePathname, useRouter } from "expo-router";
import { AuthProvider,useAuth } from '../../context/authContext';
import { supabase } from '../../lib/supabase';

const _layout = () => {
  return ( 
      <Stack>
          <Stack.Screen name="Email"options={{
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
        <Stack.Screen name="request_materialtop" options={{ headerShown: false }} /> 
      </Stack>  
  )
}

export default _layout