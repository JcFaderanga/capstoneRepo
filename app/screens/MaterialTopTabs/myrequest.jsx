import { Pressable, StyleSheet, Text, View, ScrollView, RefreshControl, Image,ActivityIndicator, } from 'react-native';
import React, { useEffect, useState } from 'react';
import  MyRequestBox from '../../../components/myRequestBox';
import { useAuth } from '../../../context/authContext';
import { getBloodRequest } from '../../../services/requestServices';
import ModalViewRequest from '../../../components/Modals/MyRequestModals/modalViewRequest';
import MyRequstBoxDirect from '../../../components/myRequestDirect';
const MyRequest = () => {
  const { user } = useAuth();
  const [publicRequests, setPublicRequests] = useState([]);
  const [directRequests, setDirectRequests] = useState([]);
  const [viewRequestVisible, setViewRequestVisible] = useState(false);
  const [userRequestData, setRequestData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  

  const filteredList = async () => {
    try {
      const requests = await getBloodRequest(user.id); 
      const publicRequestsData = requests.filter(request => request.public_request);
      const directRequestsData = requests.filter(request => request.direct_request); 
  
      const publicRequestShowOnly3Data = publicRequestsData.slice(0, 3);
      setPublicRequests(publicRequestShowOnly3Data);
  
      const directRequestShowOnly3Data = directRequestsData.slice(0, 3);
      setDirectRequests(directRequestShowOnly3Data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };
  
  useEffect(() => {
    if (user && user.id) {
      filteredList();
    }
  }, [user]);
  
  const onRefresh = async () => {
    setRefreshing(true);
    if (user?.id) {
      await filteredList();
    }
    setRefreshing(false);
  };
  
  const viewRequest = (data) => {
    setRequestData(data);
    setViewRequestVisible(true);
  };
  if (refreshing) return <ActivityIndicator size="large" color="#F42F47" />;
 
  return (
    <ScrollView
      className="bg-gray-50 flex-1"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className="mt-5 mb-3 flex-row justify-between items-center px-3">
        <Text className="text-xl font-bold">Public Requests</Text>
          <Pressable className="flex-row items-center">
            <Text>More</Text>
            <Image source={require('../../../assets/icon/smallArrow.png')} className="h-3 w-5" resizeMode='contain'/>
          </Pressable>
      </View>
      
      {/* Public requests display */}
      {publicRequests.length > 0 ? (
        publicRequests.map((request, index) => (
          <MyRequestBox 
            key={index} 
            timeStamp={request.created_at} 
            units={request.units} 
            onPress={() => viewRequest(request)}
          />
        ))
      ) : (
        <View className="w-full h-14"> 
          <Text className="text-gray-300 text-base font-bold text-center">No public requests found</Text>
        </View>
      )}

      <View className="mt-6 mb-3 flex-row justify-between items-center px-3">
        <Text className="text-xl font-bold">Direct Requests</Text>
        <Pressable className="flex-row items-center">
            <Text>More</Text>
            <Image source={require('../../../assets/icon/smallArrow.png')} className="h-3 w-5" resizeMode='contain'/>
          </Pressable>
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
            onPress={() => viewRequest(request)} // Pass the correct request ID
          />
        ))
      ) : (
        <View className="w-full h-14"> 
          <Text className="text-gray-300 text-base font-bold text-center">No direct requests found</Text>
        </View>
      )}

      <ModalViewRequest
        requestData={userRequestData}
        visible={viewRequestVisible}
        onRequestClose={() => setViewRequestVisible(false)} 
      />
    </ScrollView>
  );
};

export default MyRequest;

const styles = StyleSheet.create({});
