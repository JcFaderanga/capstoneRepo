import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import Elevated from "../elevated";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
const DonationBox = ({
  recipient,
  units_donated,
  schedule_date,
  donation_status,
  blood_type,
  onPress,
}) => {
  const unitDonatedVolume = units_donated * 450;

  const statusTag = {
    complete: (
      <Text className="font-bold text-base pt-1 text-green-700 bg-green-100">
        {/* {"  Complete"} */}
        Thursday, January 28 - 9:21AM
      </Text>
    ),
    missed: (
      <Text className="font-bold text-base text-primary_red bg-red-50">
        Missed Schedule
      </Text>
    ),
    pending: (
      <Text className="font-bold text-base pt-1 text-orange-400 bg-orange-100">
        {" "}
        Pending
      </Text>
    ),
  };

  const formattedDate = (sched_date) => {
    const dateObj = new Date(sched_date);
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  return (
    <View className="bg-white my-1">
      <View className="w-full px-4 pt-3 pb-1 overflow-hidden">
        <View className="flex-row p-2">
          <View className="flex justify-center">
            <View className="flex-row justify-between items-center w-full ">
              <View className="flex-row">
                <Image
                  source={require("../../assets/icon/donated.png")}
                  className="w-6 h-7"
                  resizeMode="contain"
                />
                <Text className="font-bold px-2 text-primary_red text-xl">
                  {recipient}
                </Text>
              </View>
              {blood_type ? (
                <Text className="font-bold text-xl bg-slate-100 py-1 px-2 rounded-xl text-primary_red">
                  {blood_type}
                </Text>
              ) : (
                ""
              )}
            </View>
            <Text className="font-bold text-base pt-2">
              Volume:{" "}
              <Text className="font-normal">
                {units_donated}
                {units_donated >= 1 ? " units" : " unit"} ({unitDonatedVolume}
                ml)
              </Text>
            </Text>
            <View className="flex-row justify-between w-full">
              <Text className="font-bold text-base pt-2 ">
                Scheduled date:{" "}
                <Text className="font-normal">
                  {formattedDate(schedule_date)}
                </Text>
              </Text>
            </View>
            <View className=" w-full">
              <Text className="font-bold text-base pt-2 ">
                Completed date:
                {
                  statusTag[
                    new Date(schedule_date) < new Date()
                      ? donation_status === "complete"
                        ? "complete"
                        : "missed"
                      : donation_status
                  ]
                }
              </Text>
            </View>
          </View>
        </View>
        <View className="flex-row justify-between items-center border-t-2 border-slate-50 p-3">
          <View className="flex-row items-center bg-slate-100 py-1 px-3 rounded-xl">
            {/* <Image
                source={require("../../assets/icon/donated.png")}
                className="w-10 h-11 mr-3"
                resizeMode="contain"
              />{1555-096542-3} */}
            <Text className="font-bold text-lg mx-1">
              {donation_status === "pending" ? "N/A" : "1555-096542-3"}
            </Text>
          </View>
          <Pressable className="p-1 rounded-lg bg-slate-100" onPress={onPress}>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={26}
              color="#F42F47"
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default DonationBox;

const styles = StyleSheet.create({});
