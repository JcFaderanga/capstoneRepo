import { ScrollView, View, Image, Text, TouchableOpacity, Dimensions, Pressable } from 'react-native';
import React, { useState } from 'react';
import { homeIcons } from '../constant';
import Elevated from './elevated';
const screenWidth = Dimensions.get("window").width;
const DonationDrive = ({location, time, date, onPress}) => {
  return (
    <>
    <View className="px-4" style={{width:screenWidth}}>
         <Elevated width={'100%'} height={"auto"} elevated={2}>
            <View className="py-2">
                <View className="w-full max-h-28">
                    <View className=" pt-2 ">
                        <View className=" h-auto px-2 py-1 flex-row items-center">
                            <Image source={homeIcons.target} className="w-10 h-10 rounded-full mx-3" resizeMode='contain'/>
                              <View className="relative flex-1">
                                  <Text className="text-base font-bold flex-wrap">Festival Mall, Muntilupa City, 2nd floor 2nd floor </Text>
                                  <Text className="text-[12px] ">Posted 1 hour ago</Text>
                              </View>
                        </View>       
                    </View>
                </View>
            <View className=" border-b-2 border-gray-100">
                <Text className="my-2 mx-4">Are you nearby? Join us and donate, be a hero and help save lives!</Text>
            </View>        
                <View className=" flex-row justify-between items-center px-4 py-3">
                <Pressable className="rounded-[20px] rounded-bl-none w-28 h-9 bg-primary_red flex-row justify-center items-center"
                onPress={onPress}
                >
                        <Text className="text-white font-bold px-2">See all</Text>
                        <Image style={{tintColor: "white"}} source={require('../assets/icon/arrowNoCircle.png')} resizeMode='contain' className="w-4"/>
                    </Pressable>
                    <View className=" flex-row items-center h-10 pl-2">
                              <Image style={{tintColor: '#f42f47'  }} source={homeIcons.calendar} className="w-6" resizeMode='contain'/>
                                <View className="px-2">
                                    <Text className="text-[16px] ">June 18, 2024 </Text>
                                    <Text className="text-[12px] ">10am - 5pm</Text>
                                </View>
                          
                    </View>
                    
                </View>
            </View>
        </Elevated>
      </View>
    </>
  );
};


export default DonationDrive;
