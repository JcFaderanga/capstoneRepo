import { Modal, Pressable, Text, View, Image, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import SignUpHeader from '../signUpHeader';
import CustomBtn from '../UI/button/button';
import InputBox from '../UI/inputs/inputBox';
import ToggleButton from '../UI/button/toggleBtn';
import { useAuth } from '../../context/authContext';
import { supabase } from '../../lib/supabase';
import ModalRequestInvalidBloodType from './modalRequestInvalidBloodType';
import { createPublicRequest } from '../../services/requestServices';


const ModalCreateBloodRequest = ({ visible, onRequestClose, setList }) => {
  const [isRequestAnonymous, setRequestAnonymous] = useState(false);
  const [isBloodTypeValid, setBloodTypeValid] = useState(false);
  const [requestUnits, setRequestUnits] = useState(1);
  const [description, setDescription] = useState('');
  const [requestDetailError, setRequestDetailError] = useState({ condition: false, message: '' });

  const { user } = useAuth();

  const SubmitRequest = async () => {
    let allFieldsFilled = true;
    
    if (allFieldsFilled) {
        if (user && user.blood_type === '--') {
          setBloodTypeValid(true);
          return; 
        }
       let request = {
          user_id: user?.id,
          blood_type: user?.blood_type,
          units: requestUnits,
          description: description,
          anonymous: isRequestAnonymous,
          public_request: true
       }
       createPublicRequest(request); //send reqeust to requestServices.js to insert
        Alert.alert("Request Successful", "Your blood request has been submitted.");
        setList([]);
        onRequestClose(); 
        setRequestUnits(1);
        setDescription('');
    }
  };
  
function Back(){
  setBloodTypeValid(false)
  setRequestUnits(1);
  setDescription('');
}
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onRequestClose}
    >
      <ModalRequestInvalidBloodType
        visible={isBloodTypeValid}
        onRequestClose={() => setBloodTypeValid(false)}
      />
      <View className="w-full h-full bg-white">
        <Pressable onPress={onRequestClose}>
          <Image
            source={require('../../assets/icon/backArrow.png')}
            className="w-5 absolute my-1 mx-6"
            resizeMode='contain'
          />
        </Pressable>
        <SignUpHeader text={`Create Blood Request`} />
        <ScrollView className="mt-5">
        <View className="px-10 my-8">
          <Text className="text-base">How many units you need?</Text>
          <View className="flex-row flex-1 justify-between items-center ">
            <Text className="text-base">Blood type <Text className="text-primaryRed font-bold">{user && user.blood_type} </Text></Text>
              <View className="flex-row border rounded-xl bg-gray-50 border-gray-300 w-[115px] h-9 justify-evenly items-center">
                  <Pressable onPress={()=>setRequestUnits(requestUnits -1)}  className="  p-2">
                      <Image source={require('../../assets/icon/minus.png')} className="w-3" resizeMode="contain"/>
                  </Pressable>
                      <Text className="text-xl font-bold text-customgray">{requestUnits}</Text>
                  <Pressable onPress={()=>setRequestUnits(requestUnits +1)} className="px-2">
                    <Image source={require('../../assets/icon/add.png')}  className="w-4" resizeMode="contain"/>
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
            borderColor={'#EAEAEA'} // No validation needed
          />
          <View className="flex-1 flex-row justify-between items-center px-8 h-20">
            <View className="flex-row items-center gap-3">
              <Image source={require('../../assets/icon/lock.png')} className="w-7" resizeMode='contain' />
              <Text className="font-bold text-[15px]">Anonymous Request</Text>
            </View>
            <ToggleButton
              onPress={(isToggled) => setRequestAnonymous(isToggled)}
              AlertTitle={'Anonymous Request'}
              AlterDescription={'Turning on Anonymous Request will hide your name and profile from the feed.'}
            />
          </View>
          <CustomBtn title={'Post Request'} onPress={SubmitRequest} />
        </ScrollView>
      </View>
    </Modal>
  );
};

export default ModalCreateBloodRequest;