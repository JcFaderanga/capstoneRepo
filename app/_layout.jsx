import React, { useEffect, useState } from 'react'
import { Stack, SplashScreen, useRouter } from "expo-router";
import { AuthProvider, useAuth } from '../context/authContext';
import { supabase } from '../lib/supabase';
import { getUserData } from '../services/userServices';
import { useFonts } from "expo-font";
import "../global.css";
import { RegistrationProvider } from '../hooks/sign_up_hooks/useRegistrationStorage';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Inter_28pt-ExtraBold": require("../assets/fonts/Inter_28pt-ExtraBold.ttf"),
    "Inter_18pt-Regular": require("../assets/fonts/Inter_18pt-Regular.ttf"),
    "Inter_18pt-Bold": require("../assets/fonts/Inter_18pt-Bold.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  return (
  
    <RegistrationProvider>
        <AuthProvider>
        
                <AuthLayout />

        </AuthProvider>
    </RegistrationProvider>
    
  );
};

const AuthLayout = () => {
  const { setAuth, setUserData } = useAuth();
  const router = useRouter();

  useEffect(() => {
      supabase.auth.onAuthStateChange((_event, session) => {
      console.log('session', session?.user?.id);

      if (session) {
        setAuth(session?.user);
        updateUserData(session?.user);
          router.replace('../../(tabs)/home');
           
      } else {
        setTimeout(() => {
          router.replace('../(auth)/sign_in');
         }, 2000); 
        console.log('INVALID SESSION');
        setAuth(null); 
      }
    });
  }, []);

  const updateUserData = async (user) => {
    let res = await getUserData(user?.id);
    console.log('APP/_LAYOUT',JSON.stringify(res, null,2));
    if(res.success) setUserData(res.data);
  };

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="pages" options={{ headerShown: false }} />
        </Stack>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;






      