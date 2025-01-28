import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import UseFetchDonation from "../../hooks/blood_donation/fetchDonation";
import { useAuth } from "../../context/authContext";
import useFetchUser from "../../hooks/user/useFetchUser";
import { useRouter } from "expo-router";
import Elevated from "../../components/elevated";
import { router } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useFetchSelectedDrive } from "../../hooks/donation_drive";
import {
  DonationRecipient,
  DonationDrive,
} from "../../components/donation_history/DonationBoxGrandChild";
const DonationHistory = () => {
  const { user } = useAuth();
  const { donationData, error, loading, FetchDonation } = UseFetchDonation({});
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    FetchDonation(user?.id);
  }, [user]);

  const handleRefresh = () => {
    setRefreshing(true);
    FetchDonation(user?.id);
    setRefreshing(false);
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size={24} color={"red"} />
        <Text>Getting donation history...</Text>
      </View>
    );
  }
  const handleDonationReview = (item) => {
    router.push({
      pathname: "../pages/donationReview",
      params: { donation_details: JSON.stringify(item) },
    });
  };

  return (
    <View className="h-full w-full bg-slate-100 ">
      <View className="py-4 flex-row border border-gray-200 bg-white">
        <View className="w-2/4 border-r border-gray-200 flex-row items-center justify-center ">
          <Text className="text-base text-primary_gray">Donation status</Text>
          <MaterialIcons name="keyboard-arrow-down" size={25} color="#3D3D3D" />
        </View>
        <View className="w-2/4 border-r border-gray-200 flex-row items-center justify-center ">
          <Text className="text-base text-primary_gray">Donation type</Text>
          <MaterialIcons name="keyboard-arrow-down" size={25} color="#3D3D3D" />
        </View>
      </View>
      {!donationData || donationData?.length === 0 ? (
        <View className="mt-12 w-full px-4">
          <View className="w-full rounded-sm ">
            <Text className="font-bold text-xl text-center">
              Take your first step in donating
            </Text>
            <View className="w-full my-2 rounded-2xl border border-stone-50">
              <View className="mx-4 mb-3 rounded-xl p-3 px-3">
                <Text className="text-center text-gray-500">
                  Every donation can save 3 lives.
                </Text>
              </View>
              <Pressable
                className="bg-primary_red mx-4 mb-7 rounded-xl py-4"
                onPress={() => router.push("./setDonation")}
              >
                <Text className="text-center text-white font-bold">
                  Set Up Your Donation
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      ) : (
        <FlatList
          data={donationData}
          keyExtractor={(item) => item?.blood_donation_id?.toString()}
          renderItem={({ item, index }) => {
            // Render each item based on the `drive_donation` property
            return item?.drive_donation ? (
              <DonationDrive
                item={item}
                index={index}
                onPress={() => handleDonationReview(item)}
              />
            ) : (
              <DonationRecipient
                item={item}
                index={index}
                onPress={() => handleDonationReview(item)}
              />
            );
          }}
          contentContainerStyle={{ paddingBottom: 10 }} // Add padding to the bottom
          onRefresh={handleRefresh} // Pull-to-refresh functionality
          refreshing={refreshing} // Set refresh state
        />
      )}
    </View>
  );
};

export default DonationHistory;
