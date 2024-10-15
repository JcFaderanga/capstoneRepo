import { StyleSheet, Text, View,Image, Pressable } from 'react-native'
import React from 'react'
import { TimeAgo } from '../constant/timeStamp'
const myRequstBox = ({timeStamp, units,onPress}) => {
  return (
    <View className="h-32 border-b-2 border-gray-200">
          <Text className="w-full h-5 bg-gray-200/50 px-2">Posted {TimeAgo(timeStamp)}</Text>
          <View className="flex-1 justify-center px-2">
            <View className="  flex-row justify-between">
              <View className="borde flex-row items-center">
                <Image source={require('../assets/icon/donated.png')} resizeMode='contain' className="w-10 h12"/>
                <Text className="px-3 text-sm text-center">
                  <Text className="font-bold text-xl">{units} 
                  </Text> units
                </Text>
              </View>  
              <Pressable className="flex justify-center" onPress={onPress}>
                <Text className="border px-6 py-1 rounded-md border-[#CBCBCB]">View Request</Text>
              </Pressable>
            </View>
          </View>
      </View>
  )
}

export default myRequstBox

const styles = StyleSheet.create({})