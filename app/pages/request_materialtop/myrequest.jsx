import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import React, { useEffect, useMemo } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import MostRecentRequest from "../../../components/request__tab/myrequest/requestBox";
import {
  FetchRequestCount,
  FetchMostRecentRequest,
  FetchUnitRecieved,
} from "../../../hooks/my_request_hooks";
import { useAuth } from "../../../context/authContext";
import { router } from "expo-router";
import ThemeButton from "../../../components/UI/button/themeButton";
const Myrequest = () => {
  const { user } = useAuth();
  const {
    count,
    loading: loadingCount,
    fetchRequestCount,
  } = FetchRequestCount();
  const { unitRecieved, error, fetchUnitRecieved } = FetchUnitRecieved();
  const {
    recentRequest,
    loading: loadingRequest,
    fetchMostRecentRequest,
  } = FetchMostRecentRequest();

  useEffect(() => {
    fetchRequestCount(user?.id);
    fetchMostRecentRequest(user?.id);
    fetchUnitRecieved(user?.id);
  }, []);

  const snapPoints = useMemo(() => ["79%", "95%"], []);
  const renderCustomHandle = () => (
    <View className="p-4 rounded-t-lg">
      <Text className="text-center text-xl font-bold">
        Your most recent request
      </Text>
    </View>
  );
  return (
    <View className="w-full h-full bg-white">
      <View className="w-full h-36 bg-slate-100 flex-row items-center justify-evenly px-2">
        <View className="w-36 h-24 bg-slate-400 rounded-3xl mx-1 py-4 px-6">
          <Text className="text-white ">Unit received</Text>
          <Text className="text-white text-4xl font-bold">{unitRecieved}</Text>
        </View>
        <View className="w-36 h-24 bg-slate-400 rounded-3xl mx-1 py-4 px-5">
          <Text className="text-white ">Total requests</Text>
          <Text className="text-white text-4xl font-bold">
            {loadingCount ? "--" : count}
          </Text>
        </View>
        <Pressable
          className="w-20 h-20 rounded-full flex items-center justify-center"
          onPress={() => router.push("/../../pages/myRequestList")}
        >
          <MaterialIcons
            name="keyboard-arrow-right"
            size={40}
            color="#94a3b8"
          />
        </Pressable>
      </View>
      {/* <View className="p-4 mt-2 bg-slate-100">
        <Text className="text-xl font-bold text-center">
          <Text className="text-primary_red">Urgent: </Text>Someone needs your
          help!{" "}
        </Text>
        <Text className="text-lg pt-4 pb-5 border-b border-gray-300 text-center">
          2 individuals need your blood donation.{" "}
        </Text>
        <Text className="text-base text-gray-500 text-center">
          Your generosity can save lives. Consider donating blood and making a
          difference today.
        </Text>
        <ThemeButton title={"Donate Now"} />
      </View> */}
      <View className="p-4 mt-2">
        <View className="w-full h-40 rounded-3xl"></View>
      </View>
    </View>
  );
};
export default Myrequest;
