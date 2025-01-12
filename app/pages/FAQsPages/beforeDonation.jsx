import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { router } from "expo-router";
import ThemeContainer from "../../../components/UI/themeContainer";
import { ScrollView } from "react-native-gesture-handler";
import ContentTitleButton from "../../../components/contentTitle";
import { FAQsIcons } from "../../../constant";
// Donation tips data
const donationTips = [
  {
    title: "1. Stay Hydrated",
    content: "- Drink plenty of water to prepare for your blood donation.",
  },
  {
    title: "2. Eat a Balanced Meal",
    content:
      "- Consume a nutritious meal rich in iron and vitamin C, such as lean meats, leafy greens, and citrus fruits.",
  },
  {
    title: "3. Avoid Fatty Foods",
    content:
      "- Steer clear of high-fat and fried foods, as they can interfere with blood tests and plasma collection.",
  },
  {
    title: "4. Get Adequate Rest",
    content:
      "- Ensure you get a good night's sleep to help your body recover and function optimally during the donation.",
  },
  {
    title: "5. Dress Appropriately",
    content:
      "- Wear a short-sleeved shirt or one with sleeves that can be rolled up above your elbow to facilitate easy access to your veins.",
  },
  {
    title: "6. Avoid Strenuous Activities",
    content:
      "- Refrain from heavy exercise or strenuous activities the day before and after donating to allow your body to recover.",
  },
  {
    title: "7. Limit Alcohol and Caffeine",
    content:
      "- Avoid consuming alcohol and caffeinated beverages, as they can lead to dehydration and may affect your donation experience.",
  },
];

// Reusable component for displaying a box
const BoxDetails = ({ title, content }) => {
  return (
    <View className="w-full px-4 py-4 border-b border-slate-200 bg-white">
      <Text className="text-base font-bold">{title}</Text>
      <Text className="text-base py-3 px-2">{content}</Text>
    </View>
  );
};

// BeforeDonation Screen
const BeforeDonation = () => {
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
        <Text className="text-white font-bold text-xl">Before Donation</Text>
        <View />
      </View>

      {/* Scrollable Content */}
      <ScrollView>
        <View>
          {/* Main Section */}
          <BoxDetails
            title="What to do day before donation?"
            content="Preparing properly the day before your blood donation can enhance your experience and ensure your safety. Here are some essential steps to follow."
          />

          {/* Tips Section */}
          {donationTips.map((tip, index) => (
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
            title={"Am I Eligible?"}
            size={{ width: 27, hieght: 25 }}
            icon={FAQsIcons.eligible}
            backIcon={FAQsIcons.arrow}
            onPress={() => router.push("./amIEligible")}
          />
        </View>
      </ScrollView>
    </ThemeContainer>
  );
};

export default BeforeDonation;

const styles = StyleSheet.create({});
