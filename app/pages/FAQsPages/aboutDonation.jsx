import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ContentTitleButton from "../../../components/contentTitle";
import { FAQsIcons } from "../../../constant";
import { router } from "expo-router";

const aboutDonation = () => {
  return (
    <View className="bg-white h-full">
      <ContentTitleButton
        title={"Why Donate Blood?"}
        size={{ width: 28, hieght: 25 }}
        icon={FAQsIcons.whyDonate}
        backIcon={FAQsIcons.arrow}
        //  onPress={() => router.push('')}
      />
      <ContentTitleButton
        title={"Am I Eligible?"}
        size={{ width: 27, hieght: 25 }}
        icon={FAQsIcons.eligible}
        backIcon={FAQsIcons.arrow}
        onPress={() => router.push("./amIEligible")}
      />
      <ContentTitleButton
        title={"Before Donation"}
        size={{ width: 27, hieght: 25 }}
        icon={FAQsIcons.donationProcess}
        backIcon={FAQsIcons.arrow}
        onPress={() => router.push("./beforeDonation")}
      />
      <ContentTitleButton
        title={"Donation Process"}
        size={{ width: 20, hieght: 20 }}
        icon={FAQsIcons.blood}
        backIcon={FAQsIcons.arrow}
        onPress={() => router.push("./donationProcess")}
      />
    </View>
  );
};

export default aboutDonation;

const styles = StyleSheet.create({});
