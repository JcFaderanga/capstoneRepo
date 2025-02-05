import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import Elevated from "../../components/elevated";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/authContext";
import useFetchDonors from "../../hooks/find_donor/useFetchDonors";
import DonorBox from "../../components/find_donor/donorBox";
import SheetRequestDonation from "./bottomSheet/findDonor/sheetRequestDonation";
import useFetchUser from "../../hooks/user/useFetchUser";
import ModalVerify from "../../components/Modals/modalVerify";
import ThemeButton from "../../components/UI/button/themeButton";
const FindDonor = () => {
  const [viewDonor, setViewDonor] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [isModalVerify, setModalVerify] = useState(false);
  const { user } = useAuth();
  console.log("find donor user verifiy", user?.verified);
  const { donor, loading, error } = useFetchDonors();
  const ViewDonorBottomSheetRef = useRef(null);

  const viewDonorProfile = (data) => {
    setSelectedDonor(data);
    ViewDonorBottomSheetRef.current?.present();
  };

  if (loading) {
    return (
      <View className="h-full w-full justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View className="h-full w-full bg-white">
      {user?.verified ? (
        donor?.length !== 0 ? (
          <FlatList
            className="h-full w-full"
            data={donor}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <DonorBox
                donor={item}
                index={index}
                onPress={() => viewDonorProfile(item)}
              />
            )}
          />
        ) : (
          <Text>No donor found.</Text>
        )
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
      <SheetRequestDonation
        ref={ViewDonorBottomSheetRef}
        donor_data={selectedDonor}
      />
    </View>
  );
};

export default FindDonor;
