import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { homeIcons } from "../../constant";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import useFetchUser from "../../hooks/user/useFetchUser";
import { DayAndDate, TimeToGo } from "../../constant/timeStamp";
import {
  useFetchAllDrive,
  useFetchSelectedDrive,
} from "../../hooks/donation_drive";
const AppointmentBox = ({ donation_details, onPress }) => {
  console.log(JSON.stringify(donation_details, null, 2));

  const { recipient, schedule_date, drive_donation } = donation_details;

  useEffect(() => {
    fetchSelectedDrive(recipient);
    fetchUser(recipient);
  }, [donation_details]);

  const {
    user: selected_recipient,
    loading: user_loading,
    fetchUser,
  } = useFetchUser();
  const {
    donationDrive,
    loading: loading_donation_drive,
    fetchSelectedDrive,
  } = useFetchSelectedDrive();

  const { first_name, last_name } = selected_recipient || {};
  const { title, address, date, time } = donationDrive || {};

  const titleHeader = drive_donation
    ? title
    : "Philippine Red Cross Muntinlupa";
  const recipientAddress = drive_donation
    ? address
    : "Red Cross Center Centennial Lane, Filinvest Corporate City, Alabang, Muntinlupa, Rizal";
  const recipientTime = drive_donation ? time : "8:00 AM - 5:00 PM";

  return (
    <>
      <View className="w-full bg-white mb-2">
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
                  {titleHeader}
                </Text>
                <Text className="text-[12px] ">{TimeToGo(schedule_date)}</Text>
              </View>
            </View>
          </View>
        </View>
        <View className=" border-b-2 border-gray-100 py-2">
          <Text className="my-2 mx-4 text-gray-500 text-sm">
            {recipientAddress}
          </Text>
          {!drive_donation ? (
            <Text className="my-2 mx-4 text-gray-500 text-base ">
              <Text className=" font-bold"> Recipient:</Text>{" "}
              {`${first_name} ${last_name}`}
            </Text>
          ) : (
            ""
          )}
        </View>
        <View className=" flex-row justify-between items-center px-4 py-3">
          <View className=" flex-row items-center  pl-2">
            <View className=" p-4 rounded-xl bg-slate-100 ">
              <FontAwesome name="calendar" size={20} color="#F42F47" />
            </View>
            <View className="px-2">
              <Text className="text-[16px] ">{DayAndDate(schedule_date)}</Text>
              <Text className="text-[12px] ">{recipientTime}</Text>
            </View>
          </View>
          <Pressable className="p-3 bg-slate-100 rounded-lg" onPress={onPress}>
            <MaterialIcons name="arrow-forward-ios" size={17} color="#F42F47" />
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default AppointmentBox;

const styles = StyleSheet.create({});
