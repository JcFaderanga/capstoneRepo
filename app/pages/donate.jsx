import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useEffect, useState } from "react";
import ThemeButton from "../../components/UI/button/themeButton";
import { useLocalSearchParams, router } from "expo-router";
import useSaveDonation from "../../hooks/blood_donation/useSaveDonation";
import { useAuth } from "../../context/authContext";
import InputBoxDate from "../../components/UI/inputs/inputBoxDate";

const Donate = ({ request_data }) => {
  const params = useLocalSearchParams();
  const [selectedDate, setSelectedDate] = useState(null);
  const [term, setTermBtn] = useState("");
  const [condition, setCondition] = useState(false);
  const { user } = useAuth();
  const { InsertDoation, error } = useSaveDonation();
  const request = JSON.parse(params?.request_data);
  console.log(selectedDate);

  useEffect(() => {
    setTermBtn(condition ? "#F42F47" : "transparent");
  }, [condition]);

  // Check if it's a Sunday (0 represents Sunday)
  useEffect(() => {
    if (selectedDate && selectedDate.getDay() === 0) {
      console.log("The date is a Sunday.");
    }
  }, [selectedDate]);

  const handleInsertDonation = () => {
    if (selectedDate && selectedDate.getDay() !== 0 && condition) {
      const DONATION_DATA = {
        blood_request_id: request?.blood_request_id,
        donor: user?.id,
        recipient: request?.user_id,
        units_donated: 1,
        schedule_date: selectedDate,
        anonymous_donation: user?.anonymous_donor,
      };
      InsertDoation(DONATION_DATA);
      router.replace("../(tabs)/request");
      alert(
        "Donation successful! Please be on time for your scheduled appointment. Your blood commitment matters."
      );
    } else {
      alert("Please check if you have filled out all fields and terms.");
    }
  };

  return (
    <View className=" bg-white h-full py-6">
      <View className=" rounded-2xl px-4">
        <View className="bg-slate-100 rounded-xl py-5 px-4">
          <Text className="text-center font-bold text-lg text-primary_gray">
            Philippine Red Cross Muntinlupa
          </Text>
          <Text className="text-center text-primary_gray">
            Red Cross Center Centennial Lane, Filinvest Corporate City, Alabang,
            Muntinlupa, Rizal
          </Text>
          <Text className="text-center text-primary_gray pt-4">
            Open Monday to Saturday 8 AM - 5 PM
          </Text>
        </View>
      </View>
      <View className="mt-[-20px]">
        <InputBoxDate
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          min={true}
        />
      </View>
      <View className="px-10 py-4">
        <Text className="text-center text-primary_red">
          {selectedDate?.getDay() === 0 ? (
            <>
              <Text className="text-center font-bold">Note:</Text> Red Cross
              Muntinlupa operates from 8 AM to 5 PM and closed on Sundays. If
              Sunday is selected, kindly consider rescheduling for Monday or
              choose an alternative day.
            </>
          ) : (
            ""
          )}
        </Text>
      </View>
      <View className=" flex-row px-10 py-5 bg-slate-100">
        <Pressable
          className="w-4 h-4 border mt-1 mr-2"
          style={{ backgroundColor: term }}
          onPress={() => setCondition(!condition)}
        />
        <Text>
          I pledge to be a responsible and consistent blood donor, contributing
          to saving lives and supporting those in need through my donations,
          whenever I am able.
        </Text>
      </View>
      {condition && selectedDate?.getDay() !== 0 ? (
        <ThemeButton title={"Submit"} onPress={handleInsertDonation} />
      ) : (
        <ThemeButton title={"Submit"} disable={true} />
      )}
    </View>
  );
};

export default Donate;
