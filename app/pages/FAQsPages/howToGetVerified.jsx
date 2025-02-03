import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import ModalVerify from "../../../components/Modals/modalVerify";
import { useAuth } from "../../../context/authContext";
import ThemeButton from "../../../components/UI/button/themeButton";
import useFetchUser from "../../../hooks/user/useFetchUser";
const howToGetVerified = () => {
  const { user } = useAuth();
  const { user: currentUser, fetchUser } = useFetchUser();
  const [isModalVerify, setModalVerify] = useState(false);

  useEffect(() => {
    fetchUser(user?.id);
  }, [user]);
  return (
    <View className="px-4 bg-white h-full w-full">
      <View className="py-5">
        <Text className="text-center font-bold text-base">
          To ensure that your blood type is correct, we encourage you to submit
          support documents stating your blood group to avoid any inconvenience
          for yourself and the recipients of your donation.
        </Text>
      </View>

      <View className=" w-full">
        <Text className="font-bold text-primary_red">
          Example documents typically accepted as proof of blood type:
        </Text>
        <View className="my-2">
          <Text className="font-bold">Blood Donation Cards or Records</Text>
          <Text> - Red Cross Blood Donor Card</Text>
          <Text> - Blood Bank Donor Card</Text>
        </View>
        <View className="my-2">
          <Text className="font-bold">
            Government-Issued IDs with Blood Type
          </Text>
          <Text> - Driver’s License (if blood type is indicated)</Text>
          <Text> - PhilHealth ID (if blood type is indicated)</Text>
          <Text> - Military ID or PNP ID (for uniformed personnel)</Text>
        </View>
        <View className="my-2">
          <Text className="font-bold">Medical Records or Certificates</Text>
          <Text>
            {" "}
            - Blood Typing Certificate (issued by a hospital, clinic, or blood
            bank)
          </Text>
          <Text>
            {" "}
            - Medical Certificate from a Licensed Physician (indicating blood
            type)
          </Text>
          <Text>
            {" "}
            - Hospital Records (e.g., laboratory test results, discharge
            summary, or patient chart)
          </Text>
        </View>
        {currentUser?.verified ? (
          ""
        ) : (
          <View className="w-full py-10">
            <Text className="text-center font-bold text-xl">
              Get Verified to become a donor
            </Text>

            <ThemeButton
              title={"Verify now"}
              onPress={() => setModalVerify(true)}
            />
          </View>
        )}
        <ModalVerify
          userId={user?.id}
          visible={isModalVerify}
          onRequestClose={() => setModalVerify(false)}
        />
      </View>
    </View>
  );
};

export default howToGetVerified;

const styles = StyleSheet.create({});
