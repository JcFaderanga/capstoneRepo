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
const FindDonor = () => {
  const [viewDonor, setViewDonor] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const { user } = useAuth();

  const { donor, loading, error } = useFetchDonors();
  const ViewDonorBottomSheetRef = useRef(null);

  const viewDonorProfile = (data) => {
    setSelectedDonor(data);
    ViewDonorBottomSheetRef.current?.present();
  };

  return (
    <View className="h-full w-full bg-white">
      {donor?.length !== 0 ? (
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
      )}
      <SheetRequestDonation
        ref={ViewDonorBottomSheetRef}
        donor_data={selectedDonor}
      />
    </View>
  );
};

export default FindDonor;
