import { Pressable, StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import  MyRequestBox from '../../../components/myRequestBox';
import { useAuth } from '../../../context/authContext';
import { getBloodRequest } from '../../../services/userServices';
import ModalViewRequest from '../../../components/Modals/MyRequestModals/modalViewRequest';
import MyRequstBoxDirect from '../../../components/myRequestDirect';
const MyRequest = () => {
  const { user } = useAuth();
  const [publicRequests, setPublicRequests] = useState([]);
  const [directRequests, setDirectRequests] = useState([]);
  const [viewRequestVisible, setViewRequestVisible] = useState(false);
  const [requestId, setRequestId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  
  useEffect(() => {
    const fetchRequests = async () => {
      if (!user || !user.id) return;
      const requests = await getBloodRequest(user.id); // Get all data from Supabase
      
      // Separate requests into public and direct
      const publicRequestsData = requests.filter(request => request.public_request);
      const directRequestsData = requests.filter(request => request.direct_request); 
      console.log(" ALL DATA --- ", directRequests)
      console.log("CHECK IF DONOR IS ANONYMOUS --- ", directRequests.anonymous_donor)
      // Set the state for public and direct requests
      let publicRequestShowOnly3Data = publicRequestsData.slice(0,2)
      setPublicRequests(publicRequestShowOnly3Data);
      let directRequestShowOnly3Data = directRequestsData.slice(0,3)
      setDirectRequests(directRequestShowOnly3Data);
    };
    fetchRequests();
  }, [user]);

  // Function to handle refreshing
  const onRefresh = async () => {
    setRefreshing(true);
    if (user?.id) {
      const refreshedRequests = await getBloodRequest(user.id);
      const publicRequestsData = refreshedRequests.filter(request => request.public_request);
      const directRequestsData = refreshedRequests.filter(request => request.direct_request); 

      let publicRequestShowOnly3Data = publicRequestsData.slice(0,2)
      setPublicRequests(publicRequestShowOnly3Data);
      let directRequestShowOnly3Data = directRequestsData.slice(0,3)
      setDirectRequests(directRequestShowOnly3Data);
    }
    setRefreshing(false); // Stop the refreshing animation
  };

  // Function to view a specific request
  const viewRequest = (id) => {
    setRequestId(id);
    setViewRequestVisible(true);
  };

  return (
    <ScrollView
      className="bg-gray-50 flex-1"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className="mt-5 mb-3 flex-row justify-between items-center px-3">
        <Text className="text-xl font-bold">Public Requests</Text>
        <Pressable><Text>More</Text></Pressable>
      </View>
      
      {/* Public requests display */}
      {publicRequests.length > 0 ? (
        publicRequests.map((request, index) => (
          <MyRequestBox 
            key={index} 
            timeStamp={request.created_at} 
            units={request.units} 
            onPress={() => viewRequest(request.blood_request_id)} // Pass the correct request ID
          />
        ))
      ) : (
        <View className="w-full h-14"> 
          <Text className="text-gray-300 text-base font-bold text-center">No public requests found</Text>
        </View>
      )}

      <View className="mt-6 mb-3 flex-row justify-between items-center px-3">
        <Text className="text-xl font-bold">Direct Requests</Text>
        <Pressable><Text>More</Text></Pressable>
      </View>
      
      {/* Direct requests display */}
      {directRequests.length > 0 ? (
        directRequests.map((request, index) => (
          <MyRequstBoxDirect
            key={index} 
            timeStamp={request.created_at} 
            units={request.units} 
            donorId={request.requested_to}
            donorAnonymous={request.anonymous_donor}
            onPress={() => viewRequest(request.blood_request_id)} // Pass the correct request ID
          />
        ))
      ) : (
        <View className="w-full h-14"> 
          <Text className="text-gray-300 text-base font-bold text-center">No direct requests found</Text>
        </View>
      )}

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
