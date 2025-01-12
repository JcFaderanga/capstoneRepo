import { Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";

const ContentTitleButton = ({ title, icon, backIcon, onPress, size }) => {
  return (
    <TouchableOpacity
      className=" flex-row justify-between items-center w-full h-20 border-b-2 border-[#F2F2F2] bg-white"
      onPress={onPress}
    >
      <View className="flex-row justify-between items-center">
        {icon ? (
          <View className="w-[50px] h-20 flex justify-center items-end">
            <Image
              source={icon}
              resizeMode="contain"
              style={size}
              tintColor={"red"}
            />
          </View>
        ) : (
          ""
        )}

        <Text className="font-bold text-lg ml-5">{title}</Text>
      </View>

      <View className="w-20 h-full flex justify-center items-center">
        <View className="bg-slate-100 rounded-lg px-2 py-2">
          <Image
            source={backIcon}
            className="h-5 w-5"
            resizeMode="contain"
            tintColor={"red"}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ContentTitleButton;
