import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import ThemeButton from "../../components/UI/button/themeButton";
import useSaveDonation from "../../hooks/blood_donation/useSaveDonation";
const Prescreening = () => {
  const params = useLocalSearchParams();
  const request_data = JSON.parse(params?.request_data);
  const { InsertDoation, error } = useSaveDonation();
  const screeningQuestions = [
    "For the past 6 months, have you had ear body piercing, tattoos?",
    "In the past year, have you had sexual contact with someone who has HIV/AIDS?",
    "Have you ever used intravenous drugs or shared needles?",
    "Have you had a blood transfusion in the past 12 months?",
    "Are you currently pregnant or recently given birth?",
    "Have you traveled to any areas with outbreaks of infectious diseases in the past 6 months?",
    "Have you been diagnosed with Hepatitis B or C?",
    "Are you currently taking any medication that affects blood clotting?",
    "Have you had any major surgeries in the past 12 months?",
    "Have you ever had a positive test for syphilis or gonorrhea?",
    "Do you have any history of cancer, including leukemia or lymphoma?",
    "Do you have a history of heart disease or stroke?",
  ];
  const handleInsertDonation = () => {
    router.push({
      pathname: "../../../../pages/donate",
      params: { request_data: JSON.stringify(request_data) },
    });
  };
  return (
    <ScrollView>
      <View className="w-full h-full bg-white px-4">
        {screeningQuestions.map((question, index) => (
          <QuestionBox key={index} question={question} />
        ))}
        <ThemeButton title={"Continue"} onPress={handleInsertDonation} />
      </View>
    </ScrollView>
  );
};

export default Prescreening;

const QuestionBox = ({ question }) => {
  const [condition, setCondition] = useState(null);

  const renderPressable = (value, label) => (
    <Pressable
      style={{
        backgroundColor: condition === value ? "#F42F47" : "transparent",
      }}
      className="w-20 h-12 border border-primary_red rounded-2xl flex justify-center mx-2"
      onPress={() => setCondition(value)}
    >
      <Text
        style={{
          color: condition === value ? "white" : "#F42F47",
        }}
        className="text-white text-center font-bold"
      >
        {label}
      </Text>
    </Pressable>
  );

  return (
    <View className="w-full rounded-xl py-4 flex-row">
      <View className="w-[50%] flex justify-center">
        <Text className="text-wrap text-base font-bold">{question}</Text>
      </View>
      <View className="flex-row items-center">
        {renderPressable(true, "Yes")}
        {renderPressable(false, "No")}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
