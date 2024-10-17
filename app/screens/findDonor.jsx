import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Elevated from '../../components/elevated';
const DonorBox =()=>{
  return(
    <Pressable className="w-11/12 h-24 mx-auto my-2">
      <Elevated width={'100%'} height={'100%'}>
          <View className="flex-1 flex-row justify-between items-center px-5">
              <View className="flex-row items-center">
                  <Image source={require('../../assets/icon/profilePic.jpg')} resizeMode='contain' className="w-14 h-14 rounded-full"/>
                  <View className="px-4">
                    <Text className="text-base font-bold ">Jc Faderanga</Text>
                    <Text className="text-[12px] leading-[13px] text-gray-500">Muntinlupa City</Text>
                  </View>
              </View>
                <Text className="text-primaryRed text-3xl font-bold">AB+</Text>
          </View>
      </Elevated>
    </Pressable>
  );
}
const FindDonor = () => {
  return (
    <View className="bg-white flex-1">
      <DonorBox/>
      <DonorBox/>
      <DonorBox/>
      <DonorBox/>
      <DonorBox/>
    </View>
  )
}

export default FindDonor

const styles = StyleSheet.create({})