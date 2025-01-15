import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import useFetchDonation from "../../hooks/blood_donation/fetchDonation";
import {
  useFetchAllDrive,
  useFetchSelectedDrive,
} from "../../hooks/donation_drive";
import { useAuth } from "../../context/authContext";
import { homeIcons } from "../../constant";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AppointmentBox } from "../../components/appointment_page";
import { FlatList } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
const ViewAppointment = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(null);
  //fetch individual donation

  const { donationData, loading, FetchDonation } = useFetchDonation({
    activeSched: true,
  });
  if (user && donationData) {
    //console.log(JSON.stringify(donationData, null, 2));
  }

  useEffect(() => {
    if (user) {
      FetchDonation(user?.id);
    }
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await FetchDonation();
    setRefreshing(false);
  };

  const handleSelectedAppointment = (item) => {
    router.push({
      pathname: "../pages/donationReview",
      params: { donation_details: JSON.stringify(item) },
    });
  };
  if (loading && !donationData) {
    return <ActivityIndicator size={24} color={"red"} />;
  }
  return (
    <View className="h-full w-full bg-slate-50">
      {/* <Text className="py-2 text-base">Up comming appointments</Text> */}
      {/* <View className="w-full border border-slate-200 h-16 items-center justify-center bg-white">
        <Pressable className="flex-row p-2">
          <Text className="text-primary_red font-bold text-base px-3">
            Filter
          </Text>
          <Ionicons name="filter" size={20} color="#F42F47" />
        </Pressable>
      </View> */}
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="h-full w-full"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {donationData?.map((item, index) => (
          <View key={item?.blood_donation_id.toString()}>
            <AppointmentBox
              donation_details={item}
              index={index}
              onPress={() => handleSelectedAppointment(item)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ViewAppointment;

const styles = StyleSheet.create({});
