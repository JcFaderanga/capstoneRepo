import { StyleSheet, Text, View,Pressable } from 'react-native'
import React from 'react'
import { useLocalSearchParams, router } from 'expo-router';
import ThemeContainer from '../../components/UI/themeContainer';
import Ionicons from '@expo/vector-icons/Ionicons';
const BloodTypeInfo = () => {
   const params = useLocalSearchParams();
   if(!params) return;
   const {blood_type} = params;

  return (
    <ThemeContainer>
        <View className="w-full h-16 bg-white flex-row justify-between items-center px-5">
          <Pressable onPress={()=> router.back()}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </Pressable>
            <Text className="text-center font-bold text-lg tracking-wide text-gray-800">
              Blood Type {blood_type}
            </Text>
            <Text className="p-1"></Text>
        </View>
    </ThemeContainer>
  )
}

export default BloodTypeInfo

const styles = StyleSheet.create({})