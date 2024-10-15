import { ScrollView, View, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { homeIcons } from '../constant';


const DonationDrive = ({location, time, date}) => {
  return (
    <View className="w-[345px] h-[70] rounded-[20px] bg-white border border-[#CCCCCC] m-2 flex-column mx-auto" >
      <View className="flex-1">
        <View className="flex-1">
          <View className=" flex-row py-2 px-5">
            <Image style={{tintColor: '#F42F47'}} source={homeIcons.target} className="w-[18px] h-[21px]" />
            <Text className="ml-3 flex-1">{location}</Text>
          </View>
          <View className="flex-row">
              <View className="flex-1 flex-row  px-5 ">
                <Image style={{tintColor: '#F42F47'}} source={homeIcons.clock} className="w-[20px] h-[20px]" />
                <Text className="ml-3 flex-1 ">{time}</Text>
              </View>
              <View className="flex-1 flex-row  px-5 ">
                <Image style={{tintColor: '#F42F47'}} source={homeIcons.calendar} className="w-[19px] h-[21px]" />
                <Text className="ml-3 flex-1 ">{date}</Text>
              </View>
          </View>
          
        </View>
      </View>
    </View>
  );
};


export default DonationDrive;
