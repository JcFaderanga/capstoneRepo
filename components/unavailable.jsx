import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

const Unavailable = () => {
  return (
    <View className="bg-white h-full">
          <View className="w-full items-center mt-14">
              <Image source={require('../assets/icon/underConstrution.jpg')} 
              resizeMode='contain'
              className="w-80 h-80"
              />
              <View className="w-full justify-center bg-gray-100 opacity-60 px-5 mt-[-50px] py-5">
                  <Text className="text-2xl font-bold text-center">We apologize, but this feature is currently unavailable.</Text>
              </View>
          </View>
        </View>
  )
}

export default Unavailable

const styles = StyleSheet.create({})