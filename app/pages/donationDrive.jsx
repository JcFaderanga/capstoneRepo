import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import Unavailable from "../../components/unavailable";
import Ionicons from "@expo/vector-icons/Ionicons";
import DonationDriveBox from "../../components/donationDrive";
import PreRegister from "./bottomSheet/donationDrvie/sheetPreRegister";
import useDonationDrive from "../../hooks/donation_drive/fetchDonationDrive";
import { useAuth } from "../../context/authContext";
import { CalculateAge } from "../../constant/timeStamp";
const DonationDrive = () => {
  const { user } = useAuth();
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [filter, setFilter] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const { donationDrive, error, loading, fetchDonationDrive } =
    useDonationDrive("eventDate");

  const expandRegistrationFormRef = useRef(null);
  const viewPreRegisterForm = (data) => {
    setSelectedDrive(data);
    expandRegistrationFormRef.current?.present();
  };
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchDonationDrive();
    setRefreshing(false);
  };
  const donationDriveDetails = {
    title: "Philippine Red Cross Muntinlupa",
    time_posted: "2024-11-25 11:41:47.519609+00",
    address:
      "Red Cross Center Centennial Lane, Filinvest Corporate City, Alabang, Muntinlupa, Rizal",
    time: "8:00 AM - 5:00 PM Closed Sunday",
  };
  return (
    <View className="w-full h-full bg-white ">
      <View className="w-full border border-slate-200 h-16 flex-row items-center justify-center">
        <Text className="text-primary_red font-bold text-base px-3">
          Ordered by Time Posted
        </Text>
        <Ionicons name="filter" size={20} color="#F42F47" />
      </View>
      <ScrollView
        className="h-full w-full"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {/* <View className="py-4">
          <DonationDriveBox
            details={donationDriveDetails}
            user={user}
            onPress={() => viewPreRegisterForm(donationDriveDetails)}
          />
        </View> */}

        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="red" />
            <Text className="text-gray-500 mt-4">Loading list...</Text>
          </View>
        ) : (
          donationDrive.map((item, index) => (
            <View key={item.drive_id.toString()}>
              <DonationDriveBox
                index={index}
                details={item}
                user={user}
                onPress={() => viewPreRegisterForm(item)}
              />
            </View>
          ))
        )}
        <View>
          {/* <Text className="text-center py-10 font-bold text-gray-400">
          No more donation drive available.
        </Text> */}
        </View>
        <PreRegister ref={expandRegistrationFormRef} props={selectedDrive} />
      </ScrollView>
    </View>
  );
};

export default DonationDrive;

const styles = StyleSheet.create({});
