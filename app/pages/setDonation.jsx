import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import React, { useState, useRef } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Unavailable from "../../components/unavailable";
import useDonationDrive from "../../hooks/donation_drive/fetchDonationDrive";
import PreRegister from "./bottomSheet/donationDrvie/sheetPreRegister";
import DonationDriveBox from "../../components/donationDrive";
import { useAuth } from "../../context/authContext";
import Elevated from "../../components/elevated";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { router } from "expo-router";
const SetDonation = () => {
  const { user } = useAuth();
  const [selectedDrive, setSelectedDrive] = useState(null);
  const { donationDrive, error, loading } = useDonationDrive("eventDate", 2);
  const expandRegistrationFormRef = useRef(null);
  const viewPreRegisterForm = (data) => {
    setSelectedDrive(data);
    expandRegistrationFormRef.current?.present();
  };

  const dateToDay = new Date();
  const dateNextWeek = new Date().setDate(dateToDay.getDate() + 7);
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  const format = new Intl.DateTimeFormat("en-US", options);
  const dateDay = format.format(dateToDay);
  const dateDayNextWeek = format.format(dateNextWeek);

  return (
    <ScrollView className="w-full h-full bg-white pt-5">
      <View className="px-3">
        <Elevated radius={10} elevated={2}>
          <Pressable className="w-full h-28  px-6 flex-row items-center">
            <View className=" h-14 w-14 rounded-xl bg-slate-100 justify-center">
              <Text className="font-bold text-primary_red text-2xl text-center">
                {dateToDay.getDate()}
              </Text>
            </View>
            <View className="flex-1 mx-4">
              <Text className="font-bold text-xl">Today</Text>
              <Text className="">{dateDay}</Text>
            </View>
          </Pressable>
        </Elevated>
      </View>
      <View className="px-3">
        <Elevated radius={10} elevated={2}>
          <Pressable className="w-full h-28 px-6  flex-row items-center ">
            <View className=" p-4 rounded-xl bg-slate-100 ">
              <FontAwesome name="calendar" size={20} color="#F42F47" />
            </View>

            <View className="flex-1 mx-4">
              <Text className="font-bold text-xl">Next week</Text>
              <Text className="">{dateDayNextWeek}</Text>
            </View>
          </Pressable>
        </Elevated>
      </View>
      <View className="px-3">
        <Elevated radius={10} elevated={2}>
          <Pressable
            className="w-full h-24 px-6 flex-row items-center "
            onPress={() => router.replace("/request")}
          >
            <View className=" p-4 rounded-xl bg-slate-100 ">
              <MaterialIcons name="person" size={20} color="#F42F47" />
            </View>
            <View className="flex-1 flex-row border justify-between border-white ml-4">
              <Text className="font-bold text-xl ">Aid someone</Text>
              <MaterialIcons
                name="arrow-forward-ios"
                size={24}
                color="#F42F47"
              />
            </View>
          </Pressable>
        </Elevated>
      </View>
      <View className="w-full border-b border-slate-200 h-16 flex-row items-center justify-center my-2">
        <Text className=" font-bold text-lg px-3">
          Donate through a Donation Drive
        </Text>
      </View>
      {donationDrive.map((item, index) => (
        <DonationDriveBox
          key={item.drive_id.toString()} // Unique key for each item
          index={index}
          details={item}
          user={user}
          onPress={() => viewPreRegisterForm(item)}
        />
      ))}
      <Pressable
        className="h-20 py-2"
        onPress={() => router.push("./donationDrive")}
      >
        <Text className="text-center text-primary_red font-bold">
          View More Donation Drives
        </Text>
      </Pressable>
      <PreRegister ref={expandRegistrationFormRef} props={selectedDrive} />
    </ScrollView>
  );
};

export default SetDonation;
const styles = StyleSheet.create({});
