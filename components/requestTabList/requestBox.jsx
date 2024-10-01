import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Elevated from '../elevated'

const RequestBox = ({name,description,bloodType,units,anonymous}) => {
  return (
    <View className="w-full px-4">
         <Elevated width={'100%'} height={200} elevated={2}>
            <View className="flex-1">
                <View className="w-full h-[65%]">
                    <View className="flex-1 h-14 pt-2">
                        <View className=" h-14 px-1 py flex-row  items-center">
                            <Image source={require('../../assets/icon/profilePic.jpg')} className="w-12 h-12 rounded-full mx-3" resizeMode='contain'/>
                                <Text className="text-base font-bold">
                                    {(anonymous)? 'Anonymouse': name} •
                                    <Text className="text-primaryRed text-lg" > {bloodType}</Text>
                                </Text>
                        </View>       
                        <Text className="my-2 mx-4">{(description)?description:`I need a blood donation of ${bloodType} as soon as possible. Please consider helping.`}</Text>
                    </View>
                </View>
                <View className="flex-1 flex-row justify-between px-4">
                    <View className=" flex-row items-center h-10">
                        <Image source={require('../../assets/icon/donated.png')} className="w-8 h-8 mr-2" resizeMode='contain'/>
                        <Text className="font-bold">{units}</Text>
                    </View>
                    <Pressable className="rounded-[20px] w-28 h-9 bg-primaryRed flex justify-center items-center">
                        <Text className="text-white font-bold">Donate</Text>
                    </Pressable>
                </View>
            </View>
        </Elevated>   
    </View>
    
  )
}

export default RequestBox

const styles = StyleSheet.create({})