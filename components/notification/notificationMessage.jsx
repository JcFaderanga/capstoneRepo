import { Text, View, Image, Pressable } from "react-native";
import React from "react";
import { TimeAgo } from "../../constant/timeStamp";
import Ionicons from "@expo/vector-icons/Ionicons";
const NotificationMassage = ({ notif }) => {
  console.log(notif);
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
};

export default NotificationMassage;
