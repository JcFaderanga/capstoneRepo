import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import Unavailable from "../../components/unavailable";
import Ionicons from "@expo/vector-icons/Ionicons";
import DonationDriveBox from "../../components/donationDrive";
import PreRegister from "./bottomSheet/donationDrvie/sheetPreRegister";
import useDonationDrive from "../../hooks/donation_drive/fetchDonationDrive";

const DonationDrive = () => {
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [filter, setFilter] = useState(null);

  const { donationDrive, error, loading } = useDonationDrive("eventDate");

  if (loading) console.log(loading);

  const expandRegistrationFormRef = useRef(null);
  const viewPreRegisterForm = (data) => {
    setSelectedDrive(data);
    expandRegistrationFormRef.current?.present();
  };

  return (
    <View className="w-full h-full bg-white ">
      <View className="w-full border border-slate-200 h-16 flex-row items-center justify-center">
        <Text className="text-primary_red font-bold text-base px-3">
          Ordered by Time Posted
        </Text>
        <Ionicons name="filter" size={20} color="#F42F47" />
      </View>
      <FlatList
        className="h-full w-full"
        data={donationDrive}
        keyExtractor={(item) => item.drive_id.toString()}
        renderItem={({ item, index }) => (
          <DonationDriveBox
            index={index}
            details={item}
            onPress={() => viewPreRegisterForm(item)}
          />
        )}
      />
      <View>
        {/* <Text className="text-center py-10 font-bold text-gray-400">
          No more donation drive available.
        </Text> */}
      </View>
      <PreRegister ref={expandRegistrationFormRef} props={selectedDrive} />
    </View>
  );
};

export default DonationDrive;

const styles = StyleSheet.create({});
