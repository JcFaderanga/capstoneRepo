import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from 'expo-router';
const Settings = () => {
  return (
    <View className="w-full h-full bg-white">
      <SafeAreaView>
      <Text>Settings</Text>
      <TouchableOpacity onPress={()=> router.push('../(tabs)/home')}>
         <Text className="h-5 w-5 border bg-gray-500 text-white">BACK</Text>
      </TouchableOpacity>
      </SafeAreaView>
    </View>
  )
}

export default Settings

