import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ReaquestHeader = () => {
  return (
    <View className="w-full h-14 flex-row items-center border-b bg-white px-5 border-gray-300">  
        <Pressable className=" h-full flex justify-center border-b-4 ">
            <Text className="text-base font-bold mx-1">For you</Text>
        </Pressable>
        <Pressable>
            <Text className="text-base text-[#9F9D9D] mx-1">My Request</Text>
        </Pressable>
        <Pressable>
            <Text className="text-base text-[#9F9D9D] mx-1">My Donation</Text>
        </Pressable>
    </View>
  )
}
export default ReaquestHeader

const styles = StyleSheet.create({

})