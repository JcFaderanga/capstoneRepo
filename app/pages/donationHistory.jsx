import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useRef, useCallback } from "react";
import UseFetchDonation from "../../hooks/blood_donation/fetchDonation";
import { useAuth } from "../../context/authContext";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import {
  DonationRecipient,
  DonationDrive,
} from "../../components/donation_history/DonationBoxGrandChild";

const DonationHistory = () => {
  const { user } = useAuth();
  const { donationData, loading, FetchDonation } = UseFetchDonation({});
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState("");
  const [selectedFilterType, setSelectedFilterType] = useState("");
  const [selectedFilterStatus, setSelectedFilterStatus] = useState("");

  // Ensure donationData exists before filtering
  const dataToFilter = donationData || [];

  // Apply both filters together
  const filteredData = dataToFilter.filter((d) => {
    const statusMatch = selectedFilterStatus
      ? selectedFilterStatus === "missed"
        ? new Date(d.schedule_date) < new Date() && d.status === "pending"
        : d.status === selectedFilterStatus
      : true;

    const typeMatch = selectedFilterType
      ? selectedFilterType === "voluntaryDonation"
        ? d.drive_donation === true
        : d.drive_donation === false
      : true;

    return statusMatch && typeMatch;
  });

  // const _selectedFilterStatus = {
  //   complete,
  //   pending,
  //   missed,
  // };
  // const _setSelectedFilterType = {
  //   voluntaryDonation,
  //   DirectDonation,
  // };

  const modalRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    FetchDonation(user?.id);
  }, [user, selectedFilterType, selectedFilterStatus]);

  const handleRefresh = () => {
    setRefreshing(true);
    FetchDonation(user?.id);
    setRefreshing(false);
  };

  const handleDonationReview = (item) => {
    router.push({
      pathname: "../pages/donationReview",
      params: { donation_details: JSON.stringify(item) },
    });
  };

  const onFilterPressed = useCallback((filterType) => {
    setFilter(filterType);
    modalRef.current?.present();
  }, []);

  const modalBackDrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );

  const renderCustomHandle = () => (
    <View className="py-4 rounded-t-lg">
      <Text className="text-center text-lg font-bold">Filter By</Text>
    </View>
  );

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size={24} color={"red"} />
        <Text>Getting donation history...</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView>
      <View className="h-full w-full bg-slate-100">
        {/* Filter Buttons */}
        <View className="flex-row border border-gray-200 bg-white">
          <Pressable
            className="w-2/4 py-3"
            onPress={() => onFilterPressed("filterStatus")}
          >
            <View className="border-r border-gray-200 flex-row items-center justify-center">
              <Text className="text-base text-primary_gray">
                {selectedFilterStatus
                  ? selectedFilterStatus
                  : "Donation status"}
              </Text>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={25}
                color="#3D3D3D"
              />
            </View>
          </Pressable>
          <Pressable
            className="w-2/4 py-3"
            onPress={() => onFilterPressed("filterType")}
          >
            <View className="border-r border-gray-200 flex-row items-center justify-center">
              <Text className="text-base text-primary_gray">
                {selectedFilterType ? selectedFilterType : "Donation type"}
              </Text>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={25}
                color="#3D3D3D"
              />
            </View>
          </Pressable>
        </View>
        {selectedFilterType || selectedFilterStatus ? (
          <View className="bg-white px-4 py-2">
            <Pressable
              onPress={() => {
                setSelectedFilterType("");
                setSelectedFilterStatus("");
              }}
            >
              <Text className="py-2">Remove Filter</Text>
            </Pressable>
          </View>
        ) : (
          ""
        )}

        {/* No Data Placeholder */}
        {!donationData || donationData?.length === 0 ? (
          <View className="mt-12 w-full px-4">
            <Text className="font-bold text-xl text-center">
              Take your first step in donating
            </Text>
            <View className="w-full my-2 rounded-2xl border border-stone-50">
              <View className="mx-4 mb-3 rounded-xl p-3 px-3">
                <Text className="text-center text-gray-500">
                  Every donation can save 3 lives.
                </Text>
              </View>
              <Pressable
                className="bg-primary_red mx-4 mb-7 rounded-xl py-4"
                onPress={() => router.push("./setDonation")}
              >
                <Text className="text-center text-white font-bold">
                  Set Up Your Donation
                </Text>
              </Pressable>
            </View>
          </View>
        ) : filteredData?.length === 0 ? (
          <Text className="text-gray-100 text-center py-5 text-2xl font-bold ">
            No result
          </Text>
        ) : (
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item?.blood_donation_id?.toString()}
            renderItem={({ item, index }) => {
              return item?.drive_donation ? (
                <DonationDrive
                  item={item}
                  index={index}
                  onPress={() => handleDonationReview(item)}
                />
              ) : (
                <DonationRecipient
                  item={item}
                  index={index}
                  onPress={() => handleDonationReview(item)}
                />
              );
            }}
            contentContainerStyle={{ paddingBottom: 10 }}
            onRefresh={handleRefresh}
            refreshing={refreshing}
          />
        )}
      </View>

      {/* Bottom Sheet Modal */}
      <BottomSheetModal
        ref={modalRef}
        backdropComponent={modalBackDrop}
        handleComponent={renderCustomHandle}
      >
        <BottomSheetView>
          {filter === "filterType" && (
            <FilterDonationType
              onPress={setSelectedFilterType}
              modalRef={modalRef}
            />
          )}
          {filter === "filterStatus" && (
            <FilterDonationStatus
              onPress={setSelectedFilterStatus}
              modalRef={modalRef}
            />
          )}
        </BottomSheetView>
      </BottomSheetModal>
    </GestureHandlerRootView>
  );
};

export default DonationHistory;

/* Components for Filters */
const FilterDonationStatus = ({ onPress, modalRef }) => {
  return (
    <>
      <Pressable
        className="px-4 py-4"
        onPress={() => {
          onPress("complete");
          modalRef.current?.close();
        }}
      >
        <Text className="text-lg">Complete</Text>
      </Pressable>
      <Pressable
        className="px-4 py-4"
        onPress={() => {
          onPress("pending");
          modalRef.current?.close();
        }}
      >
        <Text className="text-lg">Pending</Text>
      </Pressable>
      <Pressable
        className="px-4 py-4"
        onPress={() => {
          onPress("missed");
          modalRef.current?.close();
        }}
      >
        <Text className="text-lg">Missed</Text>
      </Pressable>
    </>
  );
};

const FilterDonationType = ({ onPress, modalRef }) => {
  return (
    <>
      <Pressable
        className="px-4 py-4"
        onPress={() => {
          onPress("voluntaryDonation");
          modalRef.current?.close();
        }}
      >
        <Text className="text-lg">Voluntary donation</Text>
      </Pressable>
      <Pressable
        className="px-4 py-4"
        onPress={() => {
          onPress("DirectDonation");
          modalRef.current?.close();
        }}
      >
        <Text className="text-lg">Direct to person donation</Text>
      </Pressable>
    </>
  );
};
