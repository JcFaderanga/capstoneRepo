import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ContentTitleButton from "../../../components/contentTitle";
import { FAQsIcons } from "../../../constant";
import { router } from "expo-router";

const aboutApp = () => {
  return (
    <View className="bg-white flex-1">
      <ContentTitleButton
        title={"How to get verified"}
        size={{ width: 23, height: 25 }}
        backIcon={FAQsIcons.arrow}
        onPress={() => router.push("./howToGetVerified")}
      />
      <ContentTitleButton
        title={"How to request blood donation"}
        size={{ width: 23, height: 25 }}
        backIcon={FAQsIcons.arrow}
      />
      <ContentTitleButton
        title={"How to become a donor"}
        size={{ width: 23, height: 25 }}
        backIcon={FAQsIcons.arrow}
      />
    </View>
  );
};

export default aboutApp;

const styles = StyleSheet.create({});
