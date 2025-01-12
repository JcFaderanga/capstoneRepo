import { StyleSheet, Text, View, Pressable, Image } from "react-native";
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
  const { request, fetchRequest } = FetchRequest();
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["45%", "85%"], []);
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        appearsOnIndex={2}
        disappearsOnIndex={1}
        {...props}
      />
    ),
    []
  );
  const handleSheetChange = (index) => {
    if (index < 0) {
      bottomSheetRef.current?.snapToIndex(1);
    }
  };
  const renderCustomHandle = () => (
    <View className="p-4 rounded-t-lg">
      <Text className="text-center text-xl font-bold">Donation Details</Text>
    </View>
  );
  useEffect(() => {
    if (current_user) {
      fetchUser(donationData?.recipient);
      fetchRequest(donationData?.blood_request_id);
    }
  }, [current_user]);

  if (!current_user) return null;

  const {
    blood_donation_id,
    anonymous_donation,
    blood_request_id,
    created_at,
    donor,
    recipient,
    schedule_date,
    status,
    units_donated,
  } = donationData || {};

  const { first_name = "Unknown", last_name = "Recipient" } =
    user_recipient || {};

  const { blood_type, units, urgent } = request || {};

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
          <Text className="text-center font-bold text-xl text-white ">
            {ToTitleCase(`${first_name} ${last_name}`)}
          </Text>
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
          index={0}
          snapPoints={snapPoints}
          handleComponent={renderCustomHandle}
          backdropComponent={renderBackdrop}
          onChange={handleSheetChange}
        >
          <BottomSheetView>
            <View className="bg-slate-100 py-5 px-4">
              <Text className="text-center font-bold text-lg text-primary_gray">
                Philippine Red Cross Muntinlupa
              </Text>
              <Text className="text-center text-primary_gray">
                {DayAndDate(schedule_date)}
              </Text>
            </View>
            {/* Organized Data */}
            <View className=" px-4 py-6 space-y-4">
              <KeyValueRow label="Recipient Blood Type" value={blood_type} />

              {/* Blood Request Details */}
              <KeyValueRow label="Blood Request ID" value={blood_request_id} />
              <KeyValueRow label="Units Needed" value={units} />
              <KeyValueRow label="Units Donated" value={units_donated} />
              <KeyValueRow
                label="Anonymous Request"
                value={anonymous_donation ? "Yes" : "No"}
              />
              <KeyValueRow label="Anonymous Donation" value={"Unknown"} />

              {/* Additional Info */}
              <KeyValueRow label="Urgent" value={urgent ? "Yes" : "No"} />
              <KeyValueRow label="Status" value={status} />
            </View>
            {/* Button */}
            <View className="px-4">
              <Text className="text-center font-bold text-primary_red text-lg py-4">
                What to do day before donation?
              </Text>
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
