import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import { ScrollView } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import PreRegister from "../../../donationDrvie/sheetPreRegister";
import InputBox from "../../../../../../components/UI/inputs/inputBox";

// Modal Component for Public Donations
const ModalPublicDonate = ({ visible, onRequestClose }) => {
  if (!visible) return null;

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalText}>This is the modal content</Text>
      <TouchableOpacity onPress={onRequestClose} style={styles.modalButton}>
        <Text style={styles.modalButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const PreScreening = ({ onPress, request_data }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [condition, setCondition] = useState(null); // null = no selection, true = "Yes", false = "No"
  const [isWeightValid, setWeightValid] = useState(true);
  const [weight, setWeight] = useState("");
  const router = useRouter();
  const [isDonorValid, setDonorValid] = useState(true);

  // Handle Proceeding Logic
  const handleProceed = () => {
    let valid = true;

    const weightNum = Number(weight);
    if (isNaN(weightNum) || weightNum <= 49) {
      setWeightValid(false);
      valid = false;
    } else {
      setWeightValid(true);
    }

    if (condition) {
      setDonorValid(false);
      return;
    }

    if (!valid) return; // Exit if validation fails

    setDonorValid(true);

    // Proceed to the next page if all validations pass
    router.push({
      pathname: "../../../../pages/prescreening",
      params: { request_data: JSON.stringify(request_data) },
    });

    if (onPress) {
      onPress(true);
    }
  };

  // Handle Condition Selection and Alert
  const handleConditionSelect = (value) => {
    setCondition(value);
    if (value === true) {
      Alert.alert(
        "Consult Your Doctor",
        "You have mentioned a condition that may make you ineligible for donation. Please consult your doctor for advice.",
        [{ text: "OK" }]
      );
    }
  };

  // Render the Pressable Buttons for Condition Selection
  const renderPressable = (value, label) => (
    <Pressable
      style={{
        backgroundColor: condition === value ? "#F42F47" : "transparent",
      }}
      onPress={() => handleConditionSelect(value)}
      className="w-20 h-12 border border-primary_red rounded-2xl flex justify-center mx-2"
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

  // Modal Component Handling
  if (modalVisible) {
    return (
      <ModalPublicDonate
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      />
    );
  }

  return (
    <ScrollView className="bg-white">
      <View className="w-full px-4 mt-5 mb-10">
        <View className="w-full rounded-xl bg-slate-100 px-4 py-4 my-2">
          <Text className="text-base text-center my-2">
            By becoming a blood donor, you ensure that the blood you provide is
            healthy and beneficial for those in need.
          </Text>
        </View>

        <View className="w-full rounded-xl px-4 py-2">
          <Text className="font-bold text-base my-2">
            Conditions that make your blood unsuitable for donation:
          </Text>
          <Text className="text-base px-3">
            1. Acquired Immune Deficiency Syndrome (AIDS)/HIV Infection
          </Text>
          <Text className="text-base px-3">2. Hepatitis</Text>
          <Text className="text-base px-3">3. Syphilis</Text>
          <Text className="text-base px-3">4. Malaria</Text>
        </View>

        {/* Yes/No Selection */}
        <View className="w-full rounded-xl py-2 flex-row">
          <View className="w-[50%] flex justify-center">
            <Text className="text-wrap text-base font-bold">
              Do you have any conditions mentioned above?
            </Text>
          </View>
          <View className="flex-row items-center">
            {renderPressable(true, "Yes")}
            {renderPressable(false, "No")}
          </View>
        </View>

        <View>
          <InputBox
            detail={
              <Text className="text-center font-bold text-base">
                What is your current weight in kilograms (Kg)?
              </Text>
            }
            keyboardType="numeric"
            title="0 Kg"
            onChangeText={(val) => setWeight(val)}
          />
        </View>

        {!isWeightValid && (
          <Text className="text-primary_red font-bold text-center mt-2">
            You must weigh at least 50 kg to be eligible for donation.
          </Text>
        )}

        {condition && (
          <View>
            <Text className="text-primary_red font-bold text-center mt-2">
              You have one or more conditions mentioned above that may make your
              blood unsuitable for donation. Please consult your doctor for
              further advice.
            </Text>
          </View>
        )}

        {/* Proceed Button */}
        <TouchableOpacity
          disabled={!weight || condition !== false ? true : false} // Enabled only if "No" is selected
          style={{
            opacity: !weight || condition !== false ? 0.5 : 1,
          }}
          className="w-[310px] h-[50px] mx-auto rounded-2xl bg-primary_red justify-center items-center shadow-md mt-10"
          onPress={handleProceed}
        >
          <Text className="text-white font-bold text-xl">Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default PreScreening;

// Styles
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalText: {
    color: "white",
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#F42F47",
    padding: 10,
    borderRadius: 10,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
