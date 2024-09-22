import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from "expo-status-bar";
import React, {useEffect} from 'react';
import CustomBtn from '../components/button';
import { router } from 'expo-router';
import { Image } from 'react-native';


const Index = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
        router.push('./sign_in')
    }, 2000); 
},[]);


  return (
      <View className="w-full h-full flex justify-center items-center bg-primaryRed">
         <Image source={require('../assets/icon/bloodlink.png')} className="w-[290px]" resizeMode='contain'/>

        <StatusBar backgroundColor="#F42F47" style="light" />
      </View>
  );
}

export default Index;
