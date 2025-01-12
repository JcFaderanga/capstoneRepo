import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { router } from "expo-router";
import ThemeContainer from "../../../components/UI/themeContainer";
import { ScrollView } from "react-native-gesture-handler";
import ContentTitleButton from "../../../components/contentTitle";
import { FAQsIcons } from "../../../constant";
// Donation tips data
const donationProcess = [
  {
    title: "1. Register",
    content:
      "When you arrive at the donation center, our friendly staff will welcome you and guide you to the registration area. You’ll be asked to fill out a form with your personal details and present a valid ID. This step ensures that we have all the necessary information to track your donation and ensure a smooth process.",
  },
  {
    title: "2. Health Check",
    content:
      "Before you proceed to donate, a quick health check will be done by our healthcare team. We’ll check your blood pressure, pulse, and hemoglobin levels to make sure you’re in the best condition to donate. This is an important step to ensure your safety and the safety of the person who will receive your blood.",
  },
  {
    title: "3. Donation",
    content:
      "Once everything is confirmed, you’ll be seated in a comfortable chair. Our staff will clean your arm with antiseptic and use a new, sterile needle to draw your blood. The donation process itself takes about 10 minutes, during which you’ll be giving around 450 milliliters of blood. Rest assured, this amount is safe, and your body will replenish it soon after.",
  },
  {
    title: "4. Rest",
    content:
      "After the donation, it’s important to take a few minutes to rest. Our staff will monitor you to make sure you’re feeling well before you leave the donation area. This helps prevent any dizziness or discomfort after the procedure.",
  },
  {
    title: "5. Refreshments",
    content:
      "We’ll offer you some light snacks and drinks to help you rehydrate and restore your energy. This is a great time to relax and enjoy a small treat while your body adjusts after the donation.",
  },
  {
    title: "6. Aftercare",
    content:
      "Before you leave, our staff will provide you with some simple aftercare tips. We recommend drinking plenty of fluids throughout the day and avoiding any heavy lifting or strenuous activities. This helps ensure a smooth recovery and keeps you feeling your best.",
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

// DonationProcess Screen
const DonationProcess = () => {
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
        <Text className="text-white font-bold text-xl">Donation Process</Text>
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
          {donationProcess.map((tip, index) => (
            <BoxDetails key={index} title={tip.title} content={tip.content} />
          ))}
        </View>

        <View className="mt-5">
          <Text className="px-4 py-2 text-lg text-gray-400">Know more</Text>
          <ContentTitleButton
            title={"Before Donation"}
            backIcon={FAQsIcons.arrow}
            onPress={() => router.push("./beforeDonation")}
          />
          <ContentTitleButton
            title={"After Donation"}
            backIcon={FAQsIcons.arrow}
            // onPress={}
          />
          <ContentTitleButton
            title={"Am I Eligible?"}
            backIcon={FAQsIcons.arrow}
            onPress={() => router.push("./amIEligible")}
          />
        </View>
      </ScrollView>
    </ThemeContainer>
  );
};

export default DonationProcess;

const styles = StyleSheet.create({});
