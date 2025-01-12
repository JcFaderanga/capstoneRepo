import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { router } from "expo-router";
import ThemeContainer from "../../../components/UI/themeContainer";
import { ScrollView } from "react-native-gesture-handler";
import ContentTitleButton from "../../../components/contentTitle";
import { FAQsIcons } from "../../../constant";
// Donation tips data
const EligibilityTips = [
  {
    title: "1. Must not have given too recently",
    content: [
      "Whole blood can be donated every 56 days, up to 6 times per year; platelets every 7 days, up to 24 times per year; plasma every 28 days, up to 13 times per year; and Power Red every 112 days, up to 3 times per year. ",
    ],
  },
  {
    title: "2. Be in good general health and feeling well",
    content: [
      "Healthy means that you feel well and can perform normal activities.",
      "If you have a chronic condition such as diabetes, healthy means that you are being treated and the condition is under control.",
    ],
  },
  {
    title: "3. Be at least 18 years old in most countries",
    content: [
      "If allowed by country law, 16 and 17-year-olds may give with parental consent.",
    ],
  },
  {
    title: "4. Weigh at least 50 kg (110 pounds)",
    content: [
      "A minimum weight ensures the donor has enough blood volume to safely lose approximately 450 ml (one unit) without adverse effects such as dizziness or fainting.",
    ],
  },
  {
    title: "5. Additional requirements for donors",
    content: [
      "Males must be healthy and feeling well, at least 18 years old, at least 5’1” tall, and weigh at least 130 pounds, while females must be healthy and feeling well, at least 18 years old, at least 5’3” tall, and weigh at least 150 pounds.",
    ],
  },
  // Add more tips here as needed
];

// Reusable component for displaying a box
const BoxDetails = ({ title, content }) => {
  return (
    <View className="w-full px-4 py-4 border-b border-slate-200 bg-white">
      <Text className="text-base font-bold">{title}</Text>
      <Text className="text-base py-3 pl-2">{content}</Text>
    </View>
  );
};

const AmIEligible = () => {
  return (
    <ThemeContainer bgColor={"#f1f5f9"}>
      {/* Header */}
      <View className="bg-primary_red h-16 px-4 flex-row justify-between items-center">
        <Pressable onPress={() => router.back()}>
          <Image
            source={require("../../../assets/icon/backArrow.png")}
            tintColor={"white"}
            className="w-4"
            resizeMode="contain"
          />
        </Pressable>
        <Text className="text-white font-bold text-xl">Elegibility</Text>
        <View />
      </View>

      {/* Scrollable Content */}
      <ScrollView>
        <View>
          {/* Main Section */}
          <BoxDetails
            title="Why Is Blood Donation Eligibility Important?"
            content="Understanding your eligibility is essential to ensure a safe, effective donation process and protect the health of both the donor and the recipient."
          />

          {/* Tips Section */}
          {EligibilityTips.map((tip, index) => (
            <BoxDetails key={index} title={tip.title} content={tip.content} />
          ))}
        </View>

        <View className="mt-5">
          <Text className="px-4 py-2 text-lg text-gray-400">Know more</Text>
          <ContentTitleButton
            title={"Donation Process"}
            size={{ width: 27, hieght: 25 }}
            icon={FAQsIcons.donationProcess}
            backIcon={FAQsIcons.arrow}
            onPress={() => router.push("./donationProcess")}
          />
          <ContentTitleButton
            title={"Why Donation Blood?"}
            size={{ width: 27, hieght: 25 }}
            icon={FAQsIcons.whyDonate}
            backIcon={FAQsIcons.arrow}
            //  onPress={() => router.push('')}
          />
        </View>
      </ScrollView>
    </ThemeContainer>
  );
};

export default AmIEligible;

const styles = StyleSheet.create({});
