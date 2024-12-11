import { Modal, Pressable, Text, View, Image, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomBtn from '../../UI/button/button';
import InputBox from '../../UI/inputs/inputBox';
import ToggleButton from '../../UI/button/toggleBtn';
import { useAuth } from '../../../context/authContext';
import { supabase } from '../../../lib/supabase';
import ModalRequestInvalidBloodType from '../modalRequestInvalidBloodType';
import { createDirectRequest } from '../../../services/requestServices';
const ModalDirectRequest = ({ visible, onRequestClose, donorInfo }) => {
  const [isRequestAnonymous, setRequestAnonymous] = useState(false);
  const [isDonorAnonymous, setDonorAnonymous] = useState(false);
  const [isBloodTypeValid, setBloodTypeValid] = useState(false);
  const [requestUnits, setRequestUnits] = useState(1);
  const [description, setDescription] = useState('');
  const { user } = useAuth();

  // Check if donorInfo is valid
  const donorName = donorInfo ? donorInfo.first_name +" "+ donorInfo.last_name : 'Unknown Donor';
  const isAnonymousDonor = donorInfo ? donorInfo.anonymous_donor : false;
  const donorID = donorInfo ? donorInfo.id : null;

  const SubmitRequest = async () => {
    if (requestUnits <= 0) {
      Alert.alert('Invalid Input', 'You must request at least 1 unit.');
      return;
    }

    if (user && user.blood_type === '--') {
      setBloodTypeValid(true);
      return;
    }
    let request = {
      user_id: user.id,
      blood_type: user.blood_type,
      units: requestUnits,
      description: description,
      anonymous: isRequestAnonymous,
      anonymous_donor: isAnonymousDonor,
      direct_request: true,
      requested_to:donorID
   }
      let res = createDirectRequest(request);
      if(res.success){
          console.log("this ID is for new request -- ",res?.data?.id);
          Alert.alert('Request Successful', 'Your blood request has been submitted.');
          resetForm();
          onRequestClose();
        
      }
  };

  const resetForm = () => {
    setRequestUnits(1);
    setDescription('');
    setRequestAnonymous(false);
    setBloodTypeValid(false);
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={() => {
        resetForm();
        onRequestClose();
      }}
    >
      <ModalRequestInvalidBloodType
        visible={isBloodTypeValid}
        onRequestClose={() => setBloodTypeValid(false)}
      />
      <View className="w-full h-full bg-white">
        <Pressable onPress={onRequestClose}>
          <Image
            source={require('../../../assets/icon/backArrow.png')}
            className="w-5 absolute my-1 mx-6"
            resizeMode='contain'
          />
        </Pressable>
        <View className="w-full items-center h-20 justify-center mt-10">
          <Text className="text-xl">Requesting to <Text className="font-bold">
            {isAnonymousDonor ? "Anonymous Donor" : donorName}
          </Text></Text>
        </View>
        <ScrollView>
          <View className="px-10 my-4">
            <Text className="text-base">How many units do you need?</Text>
            <View className="flex-row flex-1 justify-between items-center ">
              <Text className="text-base">Blood type <Text className="text-primaryRed font-bold">{user && user.blood_type}</Text></Text>
              <View className="flex-row border rounded-xl bg-gray-50 border-gray-300 w-[115px] h-9 justify-evenly items-center">
                <Pressable onPress={() => requestUnits > 1 && setRequestUnits(requestUnits - 1)} className="p-2">
                  <Image source={require('../../../assets/icon/minus.png')} className="w-3" resizeMode="contain"/>
                </Pressable>
                <Text className="text-xl font-bold text-customgray">{requestUnits}</Text>
                <Pressable onPress={() => setRequestUnits(requestUnits + 1)} className="px-2">
                  <Image source={require('../../../assets/icon/add.png')} className="w-4" resizeMode="contain"/>
                </Pressable>
              </View>
            </View> 
          </View>
          <InputBox
            detail="Short description (Optional)"
            value={description}
            onChangeText={(val) => setDescription(val)}
            title="Tell something about your Request"
            borderWidth={1}
            borderColor={'#EAEAEA'}
          />
          <View className="flex-1 flex-row justify-between items-center px-8 h-20">
            <View className="flex-row items-center gap-3">
              <Image source={require('../../../assets/icon/lock.png')} className="w-7" resizeMode='contain' />
              <Text className="font-bold text-[15px]">Anonymous Request</Text>
            </View>
            <ToggleButton
              onPress={(isToggled) => setRequestAnonymous(isToggled)}
              AlertTitle={'Anonymous Request'}
              AlterDescription={'Turning on Anonymous Request will hide your name and profile from the feed.'}
            />
          </View>
          <CustomBtn title={'Submit Request'} onPress={SubmitRequest} />
        </ScrollView>
      </View>
    </Modal>
  );
};

export default ModalDirectRequest;
