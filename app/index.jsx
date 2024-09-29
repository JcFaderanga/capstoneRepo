import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from "expo-status-bar";
import React, {useEffect} from 'react';
import { router } from 'expo-router';
import { Image } from 'react-native';


const Index = () => {
  
  const login = ()=>{
    router.push('./(auth)/sign_in')
  }
  return (
      <View className="w-full h-full flex justify-center items-center bg-primaryRed">
         <Image source={require('../assets/icon/bloodlink.png')} className="w-[290px]" resizeMode='contain'/>
        <StatusBar backgroundColor="#F42F47" style="light" />
      </View>
  );
}

export default Index;
