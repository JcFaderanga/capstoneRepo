import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import ContentTitleButton from "../../components/contentTitle";
import { FAQsIcons } from "../../constant";
import { router } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
const FAQs = () => {
  return (
    <View className="bg-white h-full w-full">
      <Image
        source={require("../../assets/icon/FAQsLandingPage.png")}
        resizeMode="contain"
        className="w-full h-[240] "
      />

      <ContentTitleButton
        title={"About App"}
        size={{ width: 27, height: 25 }}
        icon={FAQsIcons.aboutApp}
        backIcon={FAQsIcons.arrow}
        onPress={() => router.push("./FAQsPages/aboutApp")}
      />
      <ContentTitleButton
        title={"About Donating Blood"}
        size={{ width: 23, height: 25 }}
        icon={FAQsIcons.aboutDonation}
        backIcon={FAQsIcons.arrow}
        onPress={() => router.push("./FAQsPages/aboutDonation")}
      />
    </View>
  );
};

export default FAQs;
