import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../../context/authContext";
import useFetchDonors from "../../hooks/find_donor/useFetchDonors";
import ThemeContainer from "../../components/UI/themeContainer";
import { ShowCompatibility } from "../../hooks/blood_validation/useBloodCopatibilty";
import RNPickerSelect from "react-native-picker-select";
import DonorList from "../../components/donor__tab/donorList";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import ModalFilterRequest from "../../components/Modals/request__tab/foryou/modalFilterRequest";
const FindDonor = () => {
  const [viewDonor, setViewDonor] = useState(false);
  const [compatibility, setCompatibility] = useState(null);
  const [modalFilterVisible, setModalFilterVisible] = useState(false);
  const [typeFilter, setTypeFilter] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [anonymousFilter, setAnonymousFilter] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();
  const { donor, loading, error, fetchDonors } = useFetchDonors();

  useEffect(() => {
    if (!user) return;
    const bloodCompatibility = ShowCompatibility(user?.blood_type);
    setCompatibility(bloodCompatibility);
  }, [user]);

  useEffect(() => {
    if (compatibility?.canReceiveFrom?.length > 0) {
      const { canReceiveFrom } = compatibility;
      fetchDonors({
        canReceiveFrom,
        typeFilter,
        anonymousFilter,
        selectedTypes,
      });
    }
  }, [compatibility, typeFilter, anonymousFilter, selectedTypes]);

  const onRefreshDonors = async () => {
    setRefreshing(true);
    try {
      if (compatibility?.canReceiveFrom?.length > 0) {
        const { canReceiveFrom } = compatibility;
        await fetchDonors({
          canReceiveFrom,
          typeFilter,
          anonymousFilter,
          selectedTypes,
        });
      }
    } catch (error) {
      console.error("Error refreshing donors:", error);
    } finally {
      setRefreshing(false);
    }
  };
  const handleSelectedBloodTypes = (types) => {
    setRefreshing(false);
    setSelectedTypes(types); // get data in array from ModalFilterRequest.jsx and store in selectedTypes
    setModalFilterVisible(false); // Close modal after selecting
  };

  return (
    <ThemeContainer>
      <View className="h-full w-full bg-white">
        <View className="w-full flex-row border border-transparent my-4">
          <DropDown
            placeholder="Type"
            list={[
              { label: "All", value: "All" },
              { label: "Compatible", value: "Compatible" },
            ]}
            onValueChange={(value) => setTypeFilter(value)}
          />
          <DropDown
            placeholder="Donor"
            list={[
              { label: "All", value: "All" },
              { label: "Anonymous", value: "true" },
              { label: "Not Anonymous", value: "false" },
            ]}
            onValueChange={(value) => setAnonymousFilter(value)}
          />
        </View>
        <View className="w-full pb-3 flex items-center justify-center ">
          <Pressable
            className="w-full rounded-2xl border-gray-200 bg-white flex justify-center"
            onPress={() => setModalFilterVisible(true)}
          >
            <View className="flex-row mx-3 items-center">
              <Image
                source={require("../../assets/icon/filter.png")}
                className="w-5 mx-2"
                resizeMode="contain"
              />
              <Text className="text-gray-400 font-bold">
                Filtered by:
                <Text className="text-primaryRed px-2 text-primary_red">
                  {" "}
                  {selectedTypes.join(", ") || "All Type"}
                </Text>
              </Text>
            </View>
          </Pressable>
        </View>
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="red" />
            <Text className="text-gray-500 mt-4">
              Searching available donors...
            </Text>
          </View>
        ) : (
          <DonorList
            user_id={user?.id}
            donor={donor}
            onRefreshDonors={onRefreshDonors}
            refreshing={refreshing}
          />
        )}
        <Pressable
          className="px-5 w-full bg-blue-100 flex-row justify-between items-center absolute bottom-0"
          onPress={() => router.push("../pages/donationDrive")}
        >
          <Text className="py-4 font-bold ">Find Nearby Donation Center</Text>
          <MaterialIcons name="arrow-forward-ios" size={20} color="black" />
        </Pressable>
      </View>

      <ModalFilterRequest
        visible={modalFilterVisible}
        onRequestClose={() => setModalFilterVisible(false)}
        selectedBloodType={handleSelectedBloodTypes}
      />
    </ThemeContainer>
  );
};

export default FindDonor;

const DropDown = ({ title, placeholder, list, onValueChange }) => {
  return (
    <View className="flex-1 px-3 h-14">
      <View className="border border-[#EAEAEA] rounded-xl bg-white">
        <RNPickerSelect
          onValueChange={onValueChange}
          style={{
            inputIOS: styles.pickerSelect,
            inputAndroid: styles.pickerSelect,
          }}
          placeholder={{
            label: placeholder,
            value: null,
            color: "gray",
          }}
          items={list}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerSelect: {
    borderWidth: 1,
    borderRadius: 300,
  },
});
