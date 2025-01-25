import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import InputBox from "../../components/UI/inputs/inputBox";
import InputBoxDate from "../../components/UI/inputs/inputBoxDate";
import ThemeButton from "../../components/UI/button/themeButton";
import { useInsertDonationDrive } from "../../hooks/donation_drive";
const CreateDonationDrive = () => {
  const [driveData, setDriveData] = useState({
    title: "",
    address: "",
    time: "",
  });
  const [date, setDate] = useState("");
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();
  const handleInputChange = (field, value) => {
    setDriveData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  const { error, loading, InsertDonationDrive } = useInsertDonationDrive();

  const handleInsert = async () => {
    await InsertDonationDrive({
      ...driveData,
      date: date,
      user: user?.id,
    });
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };

  return (
    <View className="bg-white w-full h-full">
      {success ? (
        <View className="w-full py-5 bg-green-100">
          <Text className="text-center font-bold text-green-700">
            Donation Drive posted successfully!
          </Text>
        </View>
      ) : (
        ""
      )}

      <InputBox
        detail={"Title"}
        title={"Enter donation drive title"}
        value={driveData.title}
        onChangeText={(val) => handleInputChange("title", val)}
      />
      <InputBox
        detail={"Address"}
        title={"Enter Address"}
        value={driveData.address}
        onChangeText={(val) => handleInputChange("address", val)}
      />
      <InputBoxDate
        detail={"Date"}
        min={true}
        selectedDate={date}
        setSelectedDate={setDate}
      />
      <InputBox
        detail={"Time"}
        title={"Enter Time Ex. 8:00 AM - 5:00 PM"}
        value={driveData.time}
        onChangeText={(val) => handleInputChange("time", val)}
      />
      <ThemeButton title={"Post Event"} onPress={handleInsert} />
    </View>
  );
};

export default CreateDonationDrive;

const styles = StyleSheet.create({});
