import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
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
import { supabase } from "../../../lib/supabase";
import useFetchRequest from "../../../hooks/my_request_hooks/useFetchRequest";

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

  const [requestForMe, setRequestForMe] = useState([]);
  const snapPoints = useMemo(() => ["79%", "95%"], []);
  const renderCustomHandle = () => (
    <View className="p-4 rounded-t-lg">
      <Text className="text-center text-xl font-bold">
        Your most recent request
      </Text>
    </View>
  );

  useEffect(() => {
    const fetchAllRequest = async () => {
      const { data, error } = await supabase
        .from("blood_request")
        .select("*, profile(*)")
        .eq("requested_to", user?.id);

      if (error) console.log("error", error);
      setRequestForMe(data);
    };
    fetchAllRequest();
  }, [user?.id]);

  console.log("requestForMe", requestForMe);

  return (
    <ScrollView className="w-full h-full bg-white">
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
      <Text className="font-bold text-xl py-4 px-4 text-primary_gray">
        Request For Me
      </Text>
      {requestForMe.length > 0 ? (
        <View className="">
          <View className="w-full bg-slate-100">
            {requestForMe?.map((r, index) => (
              <View key={index} className="px-4 py-4 flex-row justify-between">
                <View>
                  <Text className="text-xl font-bold">
                    {r?.profile?.first_name} {r?.profile?.last_name}
                  </Text>
                  <Text className="text-base font-bold text-primary_red">
                    Blood Group: {r?.profile?.blood_type}{" "}
                    {r?.urgent ? "| URGENT" : ""}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Pressable className="w-20 h-10 bg-white border border-slate-200 rounded-2xl flex justify-center items-center mx-1">
                    <Text>Accept</Text>
                  </Pressable>
                  <Pressable className="w-20 h-10 bg-white border border-slate-200 rounded-2xl flex justify-center items-center mx-1">
                    <Text>Decline</Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        </View>
      ) : (
        <Text className="font-bold text-xl py-4 px-4 text-gray-400 text-center">
          No Requests for you at the moment.
        </Text>
      )}

      <View className="p-4 mt-2">
        <View className="w-full h-40 rounded-3xl"></View>
      </View>
    </ScrollView>
  );
};

export default Myrequest;
