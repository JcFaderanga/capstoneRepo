import { Modal, StyleSheet, Text, View, Pressable, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useMemo } from 'react';
import QRCode from 'react-native-qrcode-svg';
import * as Animatable from 'react-native-animatable'
import { fetchRecentRequest } from '../../../../../../services/requestServices';
const MyRequest = ({ visible, onRequestClose, recentRequestData }) => {
  const [requestData, setRequestData] = useState({});
  const [recentId, setRecentId] = useState(null);

  useEffect(() => {
    if (recentRequestData?.data?.blood_request_id) {
      setRecentId(recentRequestData.data.blood_request_id);
    }
  }, [recentRequestData]);

  useEffect(() => {
    const fetchRequest = async () => {
      if (!recentId) return;
      try {
        const fetchedData = await fetchRecentRequest(recentId);
        setRequestData(fetchedData);
      } catch (error) {
        console.error('Error fetching recent request:', error);
      }
    };
    fetchRequest();
  }, [recentId]);

  const snapPoints = useMemo(() => ['50%', '70%'], []);

  return (

      <Modal
        transparent={true}
        visible={visible}
        animationType="slide"
        onRequestClose={onRequestClose}
      >
        <Pressable onPress={onRequestClose} className="w-full h-16 bg-primary_red">
          <Image
            source={require('../../../../../../assets/icon/backArrow.png')}
            className="w-5 absolute my-1 mx-5"
            style={{ tintColor: 'white' }}
            resizeMode="contain"
          />
        </Pressable>
        <View className="w-full h-full bg-primary_red px-4">
          <Animatable.View className="w-full flex justify-center items-center bg-white rounded-3xl ">
            <Text className="text-primary_red font-bold my-6 text-xl">Your Request ID</Text>
            <QRCode
              value={String(requestData?.blood_request_id)} 
              size={180} 
              color="black" 
              backgroundColor="white" 
            />
            <Text className="text-center font-bold text-3xl my-6">{requestData?.blood_request_id}</Text>
          </Animatable.View>
          <Text className="text-white my-4 text-center">
          Your blood request is pending for approval to ensure it meets the necessary criteria and aligns with resources. Please allow at least 24 - 48 hours for verification. Once approved, your request will be posted on the feed for donors to view, and you will be notified.
          </Text>
          <Animatable.View  animation = 'zoomIn' duration={200} easing={'ease-in-out'} delay={400}
          className="absolute bottom-0 left-0 right-0 mb-28"
          >
              <TouchableOpacity onPress={onRequestClose}
                  className="w-[310px] h-[50px] mx-auto rounded-2xl bg-white justify-center items-center shadow-md mt-4"
                >
                  <Text className="text-primary_red font-bold text-xl">Back to home</Text>
              </TouchableOpacity>
          </Animatable.View>
        </View>
      </Modal> 

  );
};

export default MyRequest;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerHeadline: {
    fontSize: 24,
    fontWeight: '600',
    padding: 20,
  },
});
