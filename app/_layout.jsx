import React, { useEffect, useState } from 'react'
import { Stack, SplashScreen, useRouter } from "expo-router";
import { AuthProvider, useAuth } from '../context/authContext';
import { supabase } from '../lib/supabase';
import { getUserData } from '../services/userServices';
import { useFonts } from "expo-font";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
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
    <AuthProvider>
      <AuthLayout />
    </AuthProvider>
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
       
          router.replace('../(tabs)/home');
           
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
    console.log('APP/_LAYOUT :: get user data:', res);
    if(res.success) setUserData(res.data);
  };

  return (
    <Stack>
        <Stack.Screen name="screens" options={{ headerShown: false }} />  
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;






      