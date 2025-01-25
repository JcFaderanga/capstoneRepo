import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useAuth } from "../../context/authContext";

const CreateDonationDrive = () => {
  const { user } = useAuth();

  console.log(user?.first_name);

  return (
    <View className="bg-white w-full h-full">
      <Text>{user?.first_name}</Text>
    </View>
  );
};

export default CreateDonationDrive;

const styles = StyleSheet.create({});
