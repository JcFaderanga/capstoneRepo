import {
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { homeIcons } from "../constant";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Elevated from "./elevated";
import PreRegister from "../app/pages/bottomSheet/donationDrvie/sheetPreRegister";
import { TimeAgo, DayAndDate, CalculateAge } from "../constant/timeStamp";
import UseFetchNextDonation from "../hooks/blood_donation/fetchNextDonationDays";
const screenWidth = Dimensions.get("window").width;
const DonationDrive = ({ details, onPress, user }) => {
  const { nextDonation, error, loading, FetchNextDonation } =
    UseFetchNextDonation();
  useEffect(() => {
    FetchNextDonation(user?.id);
  }, [details]);
  return (
    <>
      <View className="px-3 lg:max-w-96 lg:m-2">
        <Elevated width={"100%"} height={"auto"} elevated={1} radius={7}>
          <View className="py-2">
            <View className="w-full max-h-28">
              <View className=" pt-2 ">
                <View className=" h-auto px-2 py-1 flex-row items-center">
                  <Image
                    source={homeIcons.target}
                    className="w-10 h-10 rounded-full mx-3"
                    resizeMode="contain"
                  />
                  <View className="relative flex-1">
                    <Text className="text-base font-bold flex-wrap">
                      {details?.title}
                    </Text>
                    <Text className="text-[12px] ">
                      Posted {TimeAgo(details?.created_at)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View className=" border-b-2 border-gray-100 py-2">
              <Text className="my-2 mx-4 text-gray-500 text-sm">
                {details?.address}
              </Text>
            </View>
            <View className=" flex-row justify-between items-center px-4 py-3">
              <View className=" flex-row items-center  pl-2">
                <View className=" p-4 rounded-xl bg-slate-100 ">
                  <FontAwesome name="calendar" size={20} color="#F42F47" />
                </View>
                <View className="px-2">
                  <Text className="text-[16px] ">
                    {details?.date
                      ? DayAndDate(details?.date)
                      : "Monday - Saturday"}
                  </Text>
                  <Text className="text-[12px] ">{details?.time}</Text>
                </View>
              </View>
              <Pressable
                className="p-3 bg-slate-100 rounded-lg"
                onPress={onPress}
              >
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={17}
                  color="#F42F47"
                />
              </Pressable>
            </View>
          </View>
        </Elevated>
      </View>
    </>
  );
};

export default DonationDrive;
