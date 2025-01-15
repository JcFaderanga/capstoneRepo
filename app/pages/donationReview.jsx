import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useMemo, useCallback, useRef, useEffect } from "react";
import ThemeContainer from "../../components/UI/themeContainer";
import ThemeButton from "../../components/UI/button/themeButton";
import { useLocalSearchParams, router } from "expo-router";
import useFetchUser from "../../hooks/user/useFetchUser";
import { useAuth } from "../../context/authContext";
import { FetchRequest } from "../../hooks/my_request_hooks";
import QRCode from "react-native-qrcode-svg";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Entypo from "@expo/vector-icons/Entypo";
import { TimeAgo, DayAndDate } from "../../constant/timeStamp";
import useFetchSelectedDrive from "../../hooks/donation_drive/fetchSelectedDrive";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { supabase } from "../../lib/supabase";

import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import Unavailable from "../../components/unavailable";
import { ToTitleCase } from "../../constant/textFormat";

const KeyValueRow = ({ label, value }) => (
  <View className="flex-row justify-between items-center py-2 px-4">
    <Text className="font-bold text-base text-gray-800">{label}</Text>
    <Text className="text-base text-gray-600">{value || "N/A"}</Text>
  </View>
);

const DonationReview = () => {
  const { user: current_user } = useAuth();
  const params = useLocalSearchParams();
  const donationData = JSON.parse(params?.donation_details);

  const { user: user_recipient, fetchUser } = useFetchUser();
  const {
    donationDrive,
    loading: driveLoading,
    fetchSelectedDrive,
  } = useFetchSelectedDrive();
  const { request, fetchRequest } = FetchRequest();

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(
    () => (donationData?.drive_donation ? ["45%", "50%"] : ["45%", "85%"]),
    []
  );
  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} pressBehavior="collapse" />,
    []
  );
  const handleCancel = async (donation_id) => {
    const { error } = await supabase
      .from("blood_donation")
      .delete()
      .eq("blood_donation_id", donation_id);

    if (error) {
      console.log(error.message);
    } else {
      router.replace("../(tabs)/home");
    }
  };

  const confirmCancel = (donation_id) => {
    Alert.alert(
      "Cancel Donation",
      "Are you sure you want to cancel this donation?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancellation aborted"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => handleCancel(donation_id),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const renderCustomHandle = () => (
    <Pressable className="w-full border border-white py-4 px-5 rounded-t-2xl flex-row items-center justify-between">
      <Text className="text-xl font-bold">Donation Details</Text>
      <Pressable
        className=" px-4"
        onPress={() => confirmCancel(donationData?.blood_donation_id)}
      >
        <FontAwesome6 name="trash-alt" size={17} color="red" />
      </Pressable>
    </Pressable>
  );

  const handleSheetChange = (index) => {
    if (index < 0) {
      bottomSheetRef.current?.snapToIndex(0);
    }
  };

  useEffect(() => {
    if (current_user) {
      fetchUser(donationData?.recipient);
      fetchRequest(donationData?.blood_request_id);
      fetchSelectedDrive(donationData?.recipient);
    }
  }, [current_user]);

  if (!current_user) return null;

  const HeaderTitle = donationData?.drive_donation
    ? "Donation Drive"
    : ToTitleCase(
        `${user_recipient?.first_name || "Unknown"} ${
          user_recipient?.last_name || "Recipient"
        }`
      );

  useEffect(() => {
    if (current_user) {
      fetchUser(donationData?.recipient);
      fetchRequest(donationData?.blood_request_id);
      fetchSelectedDrive(donationData?.recipient);
    }
  }, [current_user]);

  if (!current_user) return null;

  return (
    <ThemeContainer bgColor={"#F42F47"}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {/* Header */}
        <View className=" h-16 bg-[#F42F47] flex-row items-center">
          <Pressable onPress={() => router.back()} className=" border-white">
            <Image
              source={require("../../assets/icon/backArrow.png")}
              className="w-5 my-1 mx-5 "
              style={{ tintColor: "white" }}
              resizeMode="contain"
            />
          </Pressable>
          <Text className=" font-bold text-xl text-white ">{HeaderTitle}</Text>
        </View>
        <View className="px-7">
          <View className="w-full flex justify-center items-center bg-white rounded-3xl">
            <Text className="text-primary_red font-bold my-6 text-xl">
              Your Donation ID
            </Text>
            <QRCode
              value={String(donationData?.blood_donation_id)}
              size={180}
              color="black"
              backgroundColor="white"
            />
            <Text className="text-center font-bold text-3xl my-6">
              {donationData?.blood_donation_id}
            </Text>
          </View>
        </View>
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          handleComponent={renderCustomHandle}
          backdropComponent={renderBackdrop}
          onChange={handleSheetChange}
        >
          <BottomSheetView>
            {/* Sheet Content */}
            {driveLoading ? (
              <ActivityIndicator size={24} color={"red"} />
            ) : (
              <View className="bg-slate-100 py-5 px-4">
                <Text className="text-center font-bold text-lg text-primary_gray">
                  {donationData?.drive_donation
                    ? donationDrive?.title
                    : "Philippine Red Cross Muntinlupa"}
                </Text>
                <Text className="text-center ext-lg text-primary_gray">
                  {donationData?.drive_donation
                    ? donationDrive?.address
                    : "Red Cross Center Centennial Lane, Filinvest Corporate City,Alabang, Muntinlupa, Rizal"}
                </Text>
                <Text className="text-center text-primary_gray pt-4">
                  Scheduled date: {DayAndDate(donationData?.schedule_date)}
                </Text>
              </View>
            )}

            {!donationData?.drive_donation && (
              <View className=" px-4 py-6 space-y-4">
                <KeyValueRow
                  label="Recipient Blood Type"
                  value={request?.blood_type}
                />
                <KeyValueRow
                  label="Blood Request ID"
                  value={donationData?.blood_request_id}
                />
                <KeyValueRow label="Units Needed" value={request?.units} />
                <KeyValueRow
                  label="Units Donated"
                  value={donationData?.units_donated}
                />
                <KeyValueRow
                  label="Anonymous Request"
                  value={donationData?.anonymous_donation ? "Yes" : "No"}
                />
                <KeyValueRow
                  label="Urgent"
                  value={request?.urgent ? "Yes" : "No"}
                />
                <KeyValueRow label="Status" value={donationData?.status} />
              </View>
            )}

            <View className="px-4">
              <Pressable
                onPress={() => router.replace("./FAQsPages/beforeDonation")}
              >
                <Text className="text-center font-bold text-primary_red text-lg py-4">
                  What to do day before donation?
                </Text>
              </Pressable>
              <ThemeButton title="Done" onPress={() => router.back()} />
            </View>
          </BottomSheetView>
        </BottomSheet>
      </GestureHandlerRootView>
    </ThemeContainer>
  );
};

export default DonationReview;

const styles = StyleSheet.create({});
