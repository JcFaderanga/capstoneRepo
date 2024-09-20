import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Stack, usePathname, useRouter } from "expo-router";
import Create from './sign_up/Create';
import { AuthProvider,useAuth } from '../../contex/authContex';
import { supabase } from '../../lib/supabase';
const _layout = () => {
  const {setAuth } = useAuth();
  const [userId, setUserId] = useState('');
 
  const router = useRouter();
  useEffect(()=>{
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log('session', session?.user);
      console.log('SESSION ID', session?.user.id);
      if(session){
        const user = session.user;
          setAuth(session?.user);
          setUserId(user.id);
          router.push({
            pathname: '../(tabs)/home',
            params: { userId: user.id },
        });
      }else{
          setAuth(null);
          
      }
    })
  },[])
  return (
    <AuthProvider>
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
          <Stack.Screen name="sign_in" options={{ headerShown: false }} />
          <Stack.Screen name="sign_up" options={{ headerShown: false }} />  
      </Stack>
    </AuthProvider>
  )
}

export default _layout
