import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import ThemeButton from "../../components/UI/button/themeButton";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/authContext";

const Prescreening2 = () => {
  const params = useLocalSearchParams();
  const { user } = useAuth();

  const generalQuestions = [
    "Do you feel well and healthy today?",
    "In the last 3 days have you taken aspirin?",
    "In the last 3 months have donated whole blood, platelets or plasma?",
    "For the past 6 months, have you had ear body piercing, tattoos?",
  ];

  const healthHistoryQuestions = [
    "In the past year, have you had sexual contact with someone who has HIV/AIDS?",
    "Have you ever used intravenous drugs or shared needles?",
    "Have you had a blood transfusion in the past 12 months?",
    "Are you currently pregnant or recently given birth?",
    "Have you traveled to any areas with outbreaks of infectious diseases in the past 6 months?",
    "Have you been diagnosed with Hepatitis B or C?",
    "Are you currently taking any medication that affects blood clotting?",
    "Have you had any major surgeries in the past 12 months?",
  ];

  const lifestyleQuestions = [
    "Have you ever had a positive test for syphilis or gonorrhea?",
    "Do you have any history of cancer, including leukemia or lymphoma?",
    "Do you have a history of heart disease or stroke?",
    "Have you experienced unexplained weight loss?",
    "Do you have any allergies to medications or substances?",
    "Have you been exposed to COVID-19 in the past 14 days?",
    "Do you have any chronic illnesses such as diabetes?",
    "Are you taking any medication for high blood pressure?",
    "Have you had any respiratory issues or shortness of breath recently?",
  ];

  const [responses, setResponses] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [eligibilityPercentage, setEligibilityPercentage] = useState(null);

  const handleInsertDonation = async () => {
    // Check if all questions have been answered
    if (
      Object.keys(responses).length <
      generalQuestions.length +
        healthHistoryQuestions.length +
        lifestyleQuestions.length
    ) {
      setErrorMessage("Complete all items.");
      return;
    }

    const { error } = await supabase.from("prescreening").insert({
      id: user?.id,
      recent_update: new Date(),
      prescreening_data: responses, // Directly insert the responses without stringifying
      eligibility: eligibilityPercentage,
    });

    if (error) {
      console.error("Error inserting donation:", error);
      setErrorMessage("Failed to save. Please try again.");
    } else {
      setSuccessMessage("Your responses have been saved.");
      setErrorMessage(""); // Clear error message if successful
      calculateEligibility();
    }
  };

  const calculateEligibility = () => {
    const totalQuestions =
      generalQuestions.length +
      healthHistoryQuestions.length +
      lifestyleQuestions.length;

    const safeAnswers = {
      // General Questions (Positive impact = +10, Negative impact = -10)
      "Do you feel well and healthy today?": 10, // Yes = +10%
      "In the last 3 days have you taken aspirin?": -5, // Yes = -5% (Aspirin affects blood clotting)
      "In the last 3 months have donated whole blood, platelets or plasma?":
        -10, // Yes = -10% (Frequent donations decrease eligibility)
      "For the past 6 months, have you had ear body piercing, tattoos?": -5, // Yes = -5% (Risk of infection)

      // Health History Questions (Negative impacts = -10, Positive impacts = +10)
      "In the past year, have you had sexual contact with someone who has HIV/AIDS?":
        -15, // Yes = -15% (Risk of HIV/AIDS)
      "Have you ever used intravenous drugs or shared needles?": -20, // Yes = -20% (Risk of HIV, Hepatitis)
      "Have you had a blood transfusion in the past 12 months?": -5, // Yes = -5% (Risk of infection)
      "Are you currently pregnant or recently given birth?": -10, // Yes = -10% (Pregnancy impacts eligibility)
      "Have you traveled to any areas with outbreaks of infectious diseases in the past 6 months?":
        -10, // Yes = -10% (Risk of diseases)
      "Have you been diagnosed with Hepatitis B or C?": -20, // Yes = -20% (Risk of Hepatitis)
      "Are you currently taking any medication that affects blood clotting?":
        -10, // Yes = -10% (Medications affect blood safety)
      "Have you had any major surgeries in the past 12 months?": -10, // Yes = -10% (Surgery recovery time affects donation)

      // Lifestyle Questions (General Health Risks - Negative impacts = -10, Positive impacts = +10)
      "Have you ever had a positive test for syphilis or gonorrhea?": -15, // Yes = -15% (Infectious diseases risk)
      "Do you have any history of cancer, including leukemia or lymphoma?": -20, // Yes = -20% (Cancer disqualifies some donors)
      "Do you have a history of heart disease or stroke?": -10, // Yes = -10% (Cardiac risk)
      "Have you experienced unexplained weight loss?": -10, // Yes = -10% (Could indicate an underlying health issue)
      "Do you have any allergies to medications or substances?": -5, // Yes = -5% (Mild allergy impact)
      "Have you been exposed to COVID-19 in the past 14 days?": -10, // Yes = -10% (COVID-19 exposure risks)
      "Do you have any chronic illnesses such as diabetes?": -10, // Yes = -10% (Chronic conditions affect eligibility)
      "Are you taking any medication for high blood pressure?": -5, // Yes = -5% (Medication for blood pressure)
      "Have you had any respiratory issues or shortness of breath recently?":
        -10, // Yes = -10% (Respiratory issues disqualify)
    };

    // Calculate score based on responses
    let score = 0;
    let totalPossibleScore = 0; // This will track the total possible score

    for (const [question, answer] of Object.entries(responses)) {
      if (safeAnswers[question]) {
        // Add to the total possible score, assuming safeAnswers[question] is positive
        totalPossibleScore += Math.abs(safeAnswers[question]);

        // If the answer is "Yes" (true), add the score, otherwise subtract it
        score += answer ? safeAnswers[question] : -safeAnswers[question];
      }
    }

    // Avoid division by zero in case of no answers or equal negative and positive responses
    const percentage =
      totalPossibleScore !== 0 ? (score / totalPossibleScore) * 100 : 0; // Percentage based on total possible score
    setEligibilityPercentage(Math.max(0, Math.min(percentage, 100))); // Ensure it’s between 0-100
  };

  const handleAnswerChange = (question, answer) => {
    setResponses((prev) => ({ ...prev, [question]: answer }));
  };

  return (
    <ScrollView>
      <View className="w-full h-full bg-white px-4">
        {[generalQuestions, healthHistoryQuestions, lifestyleQuestions].map(
          (questionGroup, groupIndex) => (
            <View key={groupIndex} className="mb-4">
              {questionGroup.map((question, index) => (
                <QuestionBox
                  key={index}
                  question={question}
                  onAnswerChange={handleAnswerChange}
                />
              ))}
            </View>
          )
        )}
        {errorMessage && (
          <Text className="text-red-500 text-center font-bold text-lg">
            {errorMessage}
          </Text>
        )}
        {successMessage && (
          <Text className="text-green-500 text-center font-bold text-lg">
            {successMessage}
          </Text>
        )}
        {/* {eligibilityPercentage !== null && (
          <Text className="text-center text-lg font-bold">
            Eligibility Percentage: {eligibilityPercentage.toFixed(2)}%
          </Text>
        )} */}
        <ThemeButton title={"Continue"} onPress={handleInsertDonation} />
      </View>
    </ScrollView>
  );
};
export default Prescreening2;
const QuestionBox = ({ question, onAnswerChange }) => {
  const [condition, setCondition] = useState(null);

  const handlePress = (value) => {
    setCondition(value);
    onAnswerChange(question, value);
  };

  const renderPressable = (value, label) => (
    <Pressable
      style={{
        backgroundColor: condition === value ? "#F42F47" : "transparent",
      }}
      className="w-20 h-12 border border-primary_red rounded-2xl flex justify-center mx-2"
      onPress={() => handlePress(value)}
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
