import { ScrollView, View, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { homeIcons } from '../constant';


const DonationDrive = ({location, time, date}) => {
  return (
    <View className="w-[345px] h-[180px] rounded-[14px] bg-primaryRed mx-auto border-2 border-primaryRed m-2 mb-8 flex-column">
      <Text className="w-full text-center p-2 text-white font-bold text-xl">Upcoming Donation Drive</Text>
      <View className="flex-1">
        <View className="flex-1 grid grid-row-4 grid-cols-4">
          <View className="flex-1 flex-row justify-center items-center px-5 my-1">
            <Image source={homeIcons.target} className="w-[18px] h-[21px]" />
            <Text className="ml-3 flex-1 text-white">{location}</Text>
          </View>
          <View className="flex-1 flex-row justify-center items-center px-5 my-1">
            <Image source={homeIcons.clock} className="w-[20px] h-[20px]" />
            <Text className="ml-3 flex-1 text-white">{time}</Text>
          </View>
          <View className="flex-1 flex-row justify-center items-center px-5 my-1">
            <Image source={homeIcons.calendar} className="w-[19px] h-[21px]" />
            <Text className="ml-3 flex-1 text-white">{date}</Text>
          </View>
        </View>
        <TouchableOpacity className="h-[30px] flex justify-center bg-white rounded-b-[13px] mt-2">
          <Text className="font-bold text-primaryRed text-center text-base">See All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default DonationDrive;
