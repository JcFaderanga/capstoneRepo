import { StyleSheet, Text, View,Image, Pressable } from 'react-native'
import React from 'react'
import { TimeAgo } from '../../constant/timeStamp'
import Elevated from '../elevated'

 const MyRequstBox = ({timeStamp, units,onPress,directRequestName}) => {
  return (
   <View className="w-full px-3">
    <Elevated width={'100%'} height={'auto'} elevated={3}>
      <View className="h-32 border-t-2 border-[#F42F47] bg-white rounded-md">
          <Text className="w-full px-3 pt-2 ">Posted {TimeAgo(timeStamp)}</Text>
          <View className="flex-1 w-full h-full justify-center px-4">
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
    </Elevated>
    </View>
    
  )
}
export default MyRequstBox

const styles = StyleSheet.create({})