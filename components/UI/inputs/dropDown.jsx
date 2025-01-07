import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";

const DropDown = ({ title, placeholder, list, onValueChange }) => {
  const [selectedValue, setSelectedValue] = useState(""); // Local state to handle selected value

  const handleValueChange = (value) => {
    setSelectedValue(value); // Update local state
    onValueChange(value); // Call the passed-in callback function
  };

  return (
    <View className="w-[88%] mx-auto mt-5">
      <Text className="text-base pl-2 pb-1">{title}</Text>
      <View className="border border-[#EAEAEA] rounded-xl bg-gray-50 h-[56]">
        <Picker
          selectedValue={selectedValue}
          onValueChange={handleValueChange}
          style={styles.pickerSelect}
        >
          <Picker.Item label={placeholder} value={null} color="gray" />
          {list.map((item, index) => (
            <Picker.Item
              key={index}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  pickerSelect: {
    height: 56,
    borderWidth: 1,
    borderRadius: 200,
    paddingHorizontal: 10,
    color: "#000", // Default text color
  },
});
