import { Pressable, StyleSheet, Text, View,ScrollView,RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import MyRequestBox from '../../../components/myRequestBox';
import { useAuth } from '../../../context/authContext';
import { getBloodRequest } from '../../../services/userServices';
import ModalViewRequest from '../../../components/Modals/MyRequestModals/modalViewRequest';


const MyRequest = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [viewRequestVisible, setViewRequestVisible] = useState(false);
  const [requestId, setRequestId] = useState(null); // State for storing selected request ID
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    const fetchRequests = async () => {
      if (!user || !user.id) return;
      const request = await getBloodRequest(user?.id);
      let requestVisibleResult = request.slice(0, 2); // Show only first 2 requests as an example
      setRequests(requestVisibleResult);
    };

    fetchRequests();
  }, [user]);

  // Function to handle refreshing
  const onRefresh = async () => {
    setRefreshing(true);
    
      // You can call fetchRequests() again or a modified version to refresh data
      if (user?.id) {
        const refreshedRequests = await getBloodRequest(user.id);
        setRequests(refreshedRequests.slice(0, 2)); // Show the refreshed requests
      }
      setRefreshing(false);  // Stop the refreshing animation
    // Simulated refresh delay
  };

  // Function to view a specific request
  const viewRequest = (id) => {
    setRequestId(id); 
    setViewRequestVisible(true); 
  };
  return (
    <ScrollView className="bg-gray-50 flex-1"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >

        <View className="mt-5 mb-3 flex-row justify-between items-center px-3">
          <Text className="text-xl font-bold">Public Requests</Text>
          <Pressable><Text>More</Text></Pressable>
        </View>
        {requests.length > 0 ? (
          requests.map((request, index) => (
            <MyRequestBox 
              key={index} 
              timeStamp={request.created_at} 
              units={request.units} 
              onPress={() => viewRequest(request.blood_request_id)} // Pass the correct request ID
            />
          ))
        ) : (
        <View className="w-full h-14"> 
            <Text className=" text-gray-300 text-base font-bold text-center">No public requests found</Text>
        </View>
        
        )}

        <View className="mt-6 mb-3 flex-row justify-between items-center px-3" >
          <Text className="text-xl font-bold">Direct Requests</Text>
          <Pressable><Text>More</Text></Pressable>
        </View>

        <View className="w-full "> 
        {requests.length > 0 ? (
          requests.map((request, index) => (
            <MyRequestBox 
              key={index} 
              timeStamp={request.created_at} 
              units={request.units} 
              onPress={() => viewRequest(request.blood_request_id)} // Pass the correct request ID
            />
          ))
        ) : (
        <View className="w-full h-14"> 
            <Text className=" text-gray-300 text-base font-bold text-center">No public requests found</Text>
        </View>
        
        )}
            {/* <Text className=" text-gray-300 text-base font-bold text-center">No direct requests found</Text> */}
        </View>

        <ModalViewRequest
          requestId={requestId}
          visible={viewRequestVisible}
          onRequestClose={() => setViewRequestVisible(false)} 
        />
    </ScrollView>
  );
};

export default MyRequest;

const styles = StyleSheet.create({});
