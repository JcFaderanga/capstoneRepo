import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import * as Progress from "react-native-progress";
import { useAuth } from "../../context/authContext";
import { LongDateFormat } from "../../constant/timeStamp";
import { useRouter } from "expo-router";

const BloodBank = () => {
  const { user } = useAuth();
  const bloodTypes = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  const bloodStock = [0.8, 0.4, 0.6, 0.7, 0.2, 0.6, 0.9, 0.3];
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Stop loading after 1 second
    }, 2000);

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  const handleViewBloodType = (type) => {
    router.push({
      pathname: "./bloodTypeInfo",
      params: { blood_type: type },
    });
  };

  return (
    <ScrollView className="w-full h-full bg-white">
      <View className="px-4 py-2">
        <Text className="font-bold text-2xl p-2">Did you Know?</Text>
        <View className="px-5 py-5 rounded-2xl bg-slate-100">
          <Text className="text-lg">
            {user && user.blood_type ? bloodTypeTrivia[user.blood_type] : ""}
          </Text>
        </View>
      </View>
      <View className="mt-12 w-full px-4">
        <View className="w-full rounded-sm">
          <Text className="font-bold text-xl text-center">
            Make a Life-Saving Contribution
          </Text>
          <View className="w-full my-2 rounded-2xl border border-stone-50">
            <View className="mx-4 mb-3 rounded-xl p-3 px-3">
              <Text className="text-center text-gray-500">
                Every donation has the potential to save multiple lives. Be a
                part of it!
              </Text>
            </View>
            <Pressable
              className="bg-primary_red mx-4 mb-7 rounded-xl py-4"
              onPress={() => router.push("./setDonation")}
            >
              <Text className="text-center text-white font-bold">
                Set Up Appointment
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View className="px-4">
        <Text className="font-bold py-4 text-lg text-center">
          Current Blood Stocks as of {LongDateFormat(new Date())}
        </Text>
      </View>
      <View className="w-full h-full bg-white flex-row justify-center items-center flex-wrap">
        {isLoading ? (
          <>
            <View className="flex-1 justify-center items-center">
              <ActivityIndicator size="large" color="red" />
              <Text className="text-gray-500 mt-4">
                Getting currect blood stocks...
              </Text>
            </View>
          </>
        ) : (
          bloodTypes.map((type, index) => (
            <ProgressType
              key={index}
              type={type}
              stocks={bloodStock[index]}
              stocks_label={
                bloodStock[index] >= 0.7
                  ? "High"
                  : bloodStock[index] >= 0.4
                  ? "Medium"
                  : "Low"
              }
              onPress={() => handleViewBloodType(type)}
            />
          ))
        )}
      </View>
      <View className="my-4">
        <Text></Text>
      </View>
    </ScrollView>
  );
};

export default BloodBank;

const ProgressType = ({ type, stocks, stocks_label, onPress }) => {
  return (
    <View className="pt-8 px-9 border rounded-xl border-slate-300 m-1">
      <Pressable onPress={onPress}>
        <Progress.Circle
          progress={stocks}
          size={100}
          borderWidth={0}
          color="#F42F47"
          thickness={9}
          showsText={true}
          formatText={() => type}
          textStyle={styles.progressText}
          unfilledColor="#E5E5E5"
          animated={true}
        />
      </Pressable>
      <Text className="text-center pt-2 pb-7">{stocks_label}</Text>
    </View>
  );
};

const bloodTypeTrivia = {
  "A+": "Did you know that your blood type A+ is one of the most common blood types, found in about 34% of the population? It's especially important for platelet donations.",
  "A-": "Did you know that your blood type A- is a rare blood type, found in only about 6% of the population? It can be donated to A, AB, and other A- patients.",
  "B+": "Did you know that your blood type B+ is present in about 8.5% of the population? It's compatible with both B and AB blood groups for donations.",
  "B-": "Did you know that your blood type B- is one of the rarest blood types, occurring in only 1.5% of the population? It’s often in high demand for emergencies.",
  "O+": "Did you know that your blood type O+ is the most common blood type, found in about 38% of the population? It’s a universal donor for positive blood types.",
  "O-": "Did you know that your blood type O- is the universal blood donor type, used in emergencies? Only 7% of the population has it, making it crucial for transfusions.",
  "AB+":
    "Did you know that your blood type AB+ is the universal plasma donor type, compatible with all blood groups? It’s relatively rare, found in about 3.4% of people.",
  "AB-":
    "Did you know that your blood type AB- is the rarest blood type, present in less than 1% of the population? It’s universal for AB recipients, making it highly valuable.",
};

const styles = StyleSheet.create({
  progressText: {
    color: "#F42F47",
    fontSize: 40,
    fontWeight: "bold",
  },
});
