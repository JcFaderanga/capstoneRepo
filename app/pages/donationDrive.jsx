import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Pressable,
} from "react-native";
import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import Unavailable from "../../components/unavailable";
import Ionicons from "@expo/vector-icons/Ionicons";
import DonationDriveBox from "../../components/donationDrive";
import PreRegister from "./bottomSheet/donationDrvie/sheetPreRegister";
import useDonationDrive from "../../hooks/donation_drive/fetchDonationDrive";
import { useAuth } from "../../context/authContext";
import { CalculateAge } from "../../constant/timeStamp";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { ToTitleCase } from "../../constant/textFormat";
import ThemeContainer from "../../components/UI/themeContainer";

const DonationDrive = () => {
  const { user } = useAuth();
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [filter, setFilter] = useState("timePosted");
  const [refreshing, setRefreshing] = useState(false);
  const { donationDrive, error, loading, fetchDonationDrive } =
    useDonationDrive(filter);

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

  const onFilterPressed = useCallback(() => {
    modalRef.current?.present();
  }, []);
  const modalRef = useRef(null);
  const modalBackDrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );
  const renderCustomHandle = () => (
    <View className="py-4 rounded-t-lg">
      <Text className="text-center text-lg font-bold">Filter By</Text>
    </View>
  );
  return (
    <ThemeContainer>
      <View className="w-full bg-primary_red h-16 flex-row items-center justify-between px-4 shadow-md">
        <Pressable className="flex-row p-2" onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </Pressable>
        <Text className="text-white font-bold text-2xl px-3">
          Donation Drive
        </Text>
        {user?.super_user ? (
          <Pressable
            className="flex-row p-2"
            onPress={() => router.push("./createDonationDrive")}
          >
            <AntDesign name="plus" size={24} color="white" />
          </Pressable>
        ) : (
          <Text className="p-2">
            <AntDesign name="plus" size={24} color="#F42F47" />
          </Text>
        )}
      </View>
      <GestureHandlerRootView>
        <View className="w-full border border-slate-200 h-16 items-center justify-center bg-white">
          <Pressable className="flex-row p-2" onPress={onFilterPressed}>
            <Text className="text-primary_red font-bold text-base px-3">
              Ordered by{" "}
              {filter === "donationDate" ? "Donation Date" : "Time Posted"}
            </Text>
            <Ionicons name="filter" size={20} color="#F42F47" />
          </Pressable>
        </View>
        <ScrollView
          className="w-full"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          <View className="h-full w-full lg:flex-row lg:flex-wrap lg:justify-center">
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
            <PreRegister
              ref={expandRegistrationFormRef}
              props={selectedDrive}
            />
          </View>
        </ScrollView>
        <BottomSheetModal
          ref={modalRef}
          backdropComponent={modalBackDrop}
          handleComponent={renderCustomHandle}
        >
          <BottomSheetView>
            <Pressable
              className="px-4 py-4 "
              onPress={() => {
                setFilter("timePosted");
                modalRef.current?.close();
              }}
            >
              <Text className="text-lg">Time Posted</Text>
            </Pressable>
            <Pressable
              className="px-4 py-4 "
              onPress={() => {
                setFilter("donationDate");
                modalRef.current?.close();
              }}
            >
              <Text className="text-lg">Donation Date</Text>
            </Pressable>
          </BottomSheetView>
        </BottomSheetModal>
      </GestureHandlerRootView>
    </ThemeContainer>
  );
};

export default DonationDrive;

const styles = StyleSheet.create({});
