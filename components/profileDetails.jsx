import { StyleSheet, Text, View,Image, Pressable } from 'react-native'
import React from 'react'
import Elevated from './elevated'
import ToggleButton from './UI/button/toggleBtn'
import { useAuth } from '../context/authContext'
const ProfileDetails = () => {
    const { user } = useAuth();
  return (
    <View className="w-[93%] mx-auto"> 
     <Text className="text-sm mt-4">Donation Information</Text>
        <View className="flex-row ">
            <Elevated width={100} height={85} >
                    <Pressable className="flex-1 flex-row items-center justify-center px-3 pt-2 rounded-t-[10px] bg-[#3A3A3A]" onPress={()=> console.log('pressed')}>
                        <View className="flex-row items-center justify-center gap-1">
                            <Image source={require('../assets/icon/bloodType.png')} className="w-6" resizeMode='contain'/>
                            <Text className="font-bold text-[15px]"></Text>
                        </View>
                        <Text className="text-white font-bold text-3xl">{user && user.blood_type}</Text>
                    </Pressable>
                    <View className="flex w-full items-center bg-[#3A3A3A] rounded-b-[10px] pb-2"> 
                        <Text className="text-white font-bold">Blood Group</Text>
                    </View>
                </Elevated>
                <View className=" flex-1 pl-4">
                    <Elevated width={'100%'} height={85}>
                        <View className='flex-row h-full'>
                            <View className="flex-1 justify-center items-center ">
                                <Text className="text-xs font-bold">Unit Donated</Text>
                                <View className="flex-row items-center h-[60]">
                                    <Image source={require('../assets/icon/donated.png')} className="w-10" resizeMode='contain'/>
                                    <Text className="font-bold text-[20px] pl-2">--</Text>
                                </View>
                            </View>
                            <View className="flex-1 justify-center items-center ">
                                <Text className="text-xs font-bold">Unit Donated</Text>
                                <View className="flex-row items-center h-[60]">
                                    <Image source={require('../assets/icon/nextDonation.png')} className="w-10 " resizeMode='contain'/>
                                    <Text className="font-bold text-[20px] pl-2">--</Text>
                                </View>
                            </View>
                        </View>
                    </Elevated>
                </View>  
            </View>
         <Text className="text-sm mt-4">Donation Settings</Text>   
        <View>
        <Elevated width={'100%'} height={50}>
            <View className="flex-1 flex-row justify-between items-center px-6">
                <View className="flex-row items-center gap-3">
                    <Image source={require('../assets/icon/availability.png')} className="w-7" resizeMode='contain'/>
                    <Text className="font-bold text-[15px]">Available to Donate</Text>
                </View>
                <ToggleButton/>
            </View>
        </Elevated>
        </View>
        
        <Elevated width={'100%'} height={50}>
            <View className="flex-1 flex-row justify-between items-center px-6">
                <View className="flex-row items-center gap-3">
                    <Image source={require('../assets/icon/lock.png')} className="w-7" resizeMode='contain'/>
                    <Text className="font-bold text-[15px]">Anonymous Donor</Text>
                </View>
            <ToggleButton/>
            </View>
        </Elevated> 
        
    </View>
  )
}

export default ProfileDetails

const styles = StyleSheet.create({})