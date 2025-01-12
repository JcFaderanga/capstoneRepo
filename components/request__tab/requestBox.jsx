import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Elevated from "../elevated";
import { homeIcons } from "../../constant";
import * as Animatable from "react-native-animatable";
import { color } from "@rneui/themed/dist/config";
import { ToTitleCase } from "../../constant/textFormat";
const RequestBox = ({
  user,
  name,
  description,
  bloodType,
  units,
  anonymous,
  timePosted,
  userId,
  onPress,
  index,
  gender,
}) => {
  return (
    <View className="w-full bg-white py-2 my-1">
      <Animatable.View
        className="my-1 bg-white"
        animation="zoomIn"
        duration={200}
        easing={"ease-in-out"}
        delay={index * 100}
        interationCount="infinity"
      >
        <View className="w-full h-16">
          <View className="flex-1 h-14 pt-2">
            <View className=" h-14 px-1 py flex-row  items-center">
              <Image
                source={
                  anonymous
                    ? require("../../assets/icon/anonymouseIcon.png")
                    : require("../../assets/icon/maleProfile.png")
                }
                className="w-12 h-12 rounded-full mx-3"
                resizeMode="contain"
              />
              <View>
                <Text className="text-[16px] h-7 font-bold">
                  {anonymous ? "Anonymous" : ToTitleCase(name)} •
                  <Text className="text-primary_red text-lg"> {bloodType}</Text>
                </Text>
                <Text className="text-[13px] leading-[15px] ">
                  {timePosted}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View className="border-b border-gray-100 py-1">
          <Text className="my-2 mx-4">
            {description
              ? description
              : `I need a blood donation of ${bloodType} as soon as possible. Please consider helping.`}
          </Text>
        </View>
        <View className=" flex-row justify-between items-center px-4 py-2 h-16">
          <View className=" flex-row items-center h-10">
            <Image
              source={require("../../assets/icon/donated.png")}
              className="w-8 h-8 mr-2"
              resizeMode="contain"
            />
            <Text className="font-bold">{units}</Text>
          </View>
          {userId !== user?.id ? (
            <Pressable
              className="rounded-[20px] rounded-tr-none w-28 h-10 bg-primary_red flex justify-center items-center"
              onPress={onPress}
            >
              <Text className="text-white font-bold">Donate</Text>
            </Pressable>
          ) : (
            <Pressable
              className="rounded-[20px] rounded-tr-none px-5 h-10 bg-primary_red flex justify-center items-center"
              onPress={onPress}
            >
              <Text className="text-white font-bold">View my request</Text>
            </Pressable>
          )}
        </View>
      </Animatable.View>
    </View>
  );
};

export default RequestBox;

const styles = StyleSheet.create({});
