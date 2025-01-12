import React, { useEffect, useState, useRef } from "react";
import { View, Text, FlatList, ActivityIndicator, Image } from "react-native";
import { TimeAgo } from "../../constant/timeStamp";
import { fetchRequests } from "../../services/userServices";
import RequestBox from "./requestBox";
import SheetViewRequest from "../../app/pages/bottomSheet/foryou/blood_donation/sheetViewBloodRequest";

let limit = 0;

const ProfileList = ({
  bloodTypeFilterResult,
  typeFilter,
  anonymousFilter,
  compatibility,
  user,
}) => {
  const [requestList, setRequestList] = useState([]); // Store type request to show on the list
  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const [refreshing, setRefreshing] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const ViewRequestBottomSheetRef = useRef(null);

  const getRequestList = async (limit) => {
    try {
      const requests = await fetchRequests(
        { bloodTypeFilterResult },
        typeFilter,
        anonymousFilter,
        compatibility,
        limit
      );
      setRequestList(requests); // Update request list
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Show loading indicator
      await getRequestList(); // Fetch data
      setLoading(false); // Hide loading indicator after fetching
    };
    fetchData();
  }, [bloodTypeFilterResult, typeFilter, anonymousFilter]); // Dependencies for reloading

  const handleRefresh = async () => {
    setRefreshing(true);
    await getRequestList();
    setRefreshing(false);
  };

  const fetchListLimit = async () => {
    setRefreshing(true);
    await getRequestList((limit += 10));
    setRefreshing(false);
  };

  const viewSelectedRequest = (data) => {
    setSelectedRequest(data);
    ViewRequestBottomSheetRef.current?.present();
  };

  // Render
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="red" />
        <Text className="text-gray-500 mt-4">Loading request...</Text>
      </View>
    );
  }

  if (!loading && requestList.length === 0) {
    return (
      <View className="flex-1 items-center justify-center">
        <Image
          source={require("../../assets/icon/noRequestFound.png")}
          resizeMode="contain"
          className="w-64"
        />
      </View>
    );
  }

  return (
    <View className="h-full pb-40 bg-slate-50">
      <FlatList
        className="h-full w-full"
        data={requestList}
        keyExtractor={(item) => item.blood_request_id.toString()}
        renderItem={({ item, index }) => (
          <RequestBox
            user={user}
            index={index}
            userId={item.user_id}
            name={item.userName}
            description={item.description}
            bloodType={item.blood_type}
            units={item.units}
            anonymous={item.anonymous}
            timePosted={TimeAgo(item.created_at)}
            onPress={() => viewSelectedRequest(item)}
          />
        )}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onEndReached={fetchListLimit}
      />
      <SheetViewRequest
        ref={ViewRequestBottomSheetRef}
        request_data={selectedRequest}
      />
    </View>
  );
};

export default ProfileList;
