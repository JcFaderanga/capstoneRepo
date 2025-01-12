import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useMemo, useCallback, useRef } from "react";
import QRCode from "react-native-qrcode-svg";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from "@expo/vector-icons/Entypo";
import { TimeAgo, DayAndDate } from "../../constant/timeStamp";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { useLocalSearchParams, router } from "expo-router";
import Unavailable from "../../components/unavailable";
const ViewRequest = () => {
  const params = useLocalSearchParams();
  const selectedRequest = JSON.parse(params?.request_data);
  console.log(selectedRequest);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["45%", "95%"], []);
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

  const dots = () => {
    return (
      <View className="abosolute top-0 h-14 w-10 bg-white">
        <Text>Edit</Text>
      </View>
    );
  };
  const renderCustomHandle = () => (
    <View className="p-4 rounded-t-lg">
      <Text className="text-center text-xl font-bold">Request Details</Text>
    </View>
  );
  return (
    <SafeAreaView>
      <View className="w-full h-full bg-primary_red ">
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View className=" w-full h-16 flex-row justify-between bg-primary_red">
            <Pressable onPress={() => router.back()} className=" border-white">
              <Image
                source={require("../../assets/icon/backArrow.png")}
                className="w-5 my-1 mx-5"
                style={{ tintColor: "white" }}
                resizeMode="contain"
              />
            </Pressable>
          </View>
          <View className="px-7">
            <View className="w-full flex justify-center items-center bg-white rounded-3xl">
              <Text className="text-primary_red font-bold my-6 text-xl">
                Your Request ID
              </Text>
              <QRCode
                value={String(selectedRequest?.blood_request_id)}
                size={180}
                color="black"
                backgroundColor="white"
              />
              <Text className="text-center font-bold text-3xl my-6">
                {selectedRequest?.blood_request_id}
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
              <View className="px-4 mb-5">
                <View className="w-full py-4 bg-slate-100 rounded-xl px-4 ">
                  <Text className="py-1">
                    <Text className="font-bold">Requested:</Text>{" "}
                    {DayAndDate(selectedRequest?.created_at)}
                  </Text>
                  <Text className="py-1">
                    <Text className="font-bold">Requeste Type:</Text>{" "}
                    {selectedRequest?.public_request ? "Public" : "Direct"}
                  </Text>
                  <Text className="py-1">
                    <Text className="font-bold">Unit Requested:</Text>{" "}
                    {selectedRequest?.units}
                  </Text>
                  <Text className="py-1">
                    <Text className="font-bold">Urgent:</Text>{" "}
                    {selectedRequest?.urgent ? "Yes" : "No"}
                  </Text>
                </View>
                <View className=" w-full my-10">
                  <Text className="text-center py-10 text-xl font-bold text-gray-400">
                    No Donors Yet
                  </Text>
                </View>
                <Pressable>
                  <Text className="font-bold text-center text-xl py-4 bg-red-200 rounded-xl text-red-600">
                    Delete
                  </Text>
                </Pressable>
              </View>
            </BottomSheetView>
          </BottomSheet>
        </GestureHandlerRootView>
      </View>
    </SafeAreaView>
  );
};

export default ViewRequest;

const styles = StyleSheet.create({});
