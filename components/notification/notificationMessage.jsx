import { Text, View, Image, Pressable } from "react-native";
import React from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DayAndDate, TimeAgo } from "../../constant/timeStamp";
const NotificationMassage = ({ notif }) => {
  console.log("notif", notif);

  if (notif?.notification_type === "verification") {
    return (
      <View className="px-4 border-slate-100 border bg-slate-50 py-4">
        <Text className="text-lg font-bold">Verification</Text>
        <Text>
          Your blood verification request with ID {notif?.data?.verification_id}{" "}
          has been approved.
        </Text>
      </View>
    );
  }

  if (notif?.notification_type === "donation_drive") {
    return (
      <View className="px-4 border-slate-100 border bg-slate-50 py-5">
        <View className="flex-row justify-between items-center pb-2">
          <View className="flex-row">
            <FontAwesome6
              name="location-dot"
              size={25}
              color="#F42F47"
              className="px-2"
            />
            <Text className="text-lg font-bold text-primary_red ">
              Donation Drive{" "}
            </Text>
          </View>
          <Text className="text-black font-normal text-sm">
            Posted {TimeAgo(notif?.created_at)}
          </Text>
        </View>

        <Text className="text-base">
          Join us at{" "}
          <Text className="font-bold">
            {notif?.data?.address} {notif?.data?.time}{" "}
            {DayAndDate(notif?.data?.date)}.
          </Text>
        </Text>
      </View>
    );
  }

  if (notif?.notification_type === "blood_request_direct") {
    return (
      <View className="w-full px-4 py-4 border-b border-slate-100 bg-slate-50">
        <View className="w-full flex-row items-center border border-transparent">
          <Ionicons name="mail" size={26} color="#F42F47" className="px-2" />
          <Text className="text-base">
            <Text className="font-bold">
              {notif?.data?.anonymous
                ? "Anonymous Patient"
                : `${notif?.profile?.first_name} ${notif?.profile?.last_name}`}
            </Text>{" "}
            sent you a Blood Request
          </Text>
        </View>
        <View className="flex-1  pl-12 pr-5">
          <View className="w-full border border-gray-200 bg-white rounded-3xl rounded-tl-none py-2 px-4">
            <Text className="text-sm">
              Request sent {TimeAgo(notif?.created_at)}
            </Text>
            <View className="flex-row justify-between items-center border border-transparent py-4">
              <Text className="text-primary_red font-bold text-2xl">
                {notif?.profile?.blood_type}
              </Text>
              <Pressable className="bg-primary_red py-2 px-7 rounded-full">
                <Text className="text-white font-bold">Donate</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    );
  }
};

export default NotificationMassage;
