import { Modal, Pressable, Text, View, Image, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import SignUpHeader from '../signUpHeader';
import CustomBtn from '../UI/button/button';
import InputBox from '../UI/inputs/inputBox';
import ToggleButton from '../UI/button/toggleBtn';
import { useAuth } from '../../context/authContext';
import { supabase } from '../../lib/supabase';
import ModalRequestInvalidBloodType from './modalRequestInvalidBloodType';

const ModalCreateBloodRequest = ({ visible, onRequestClose }) => {
  const [isRequestAnonymous, setRequestAnonymous] = useState(false);
  const [isBloodTypeValid, setBloodTypeValid] = useState(false);
  const [requestDetails, setRequestDetails] = useState('');
  const [requestUnits, setRequestUnits] = useState('');
  const [description, setDescription] = useState('');
  const [requestDetailError, setRequestDetailError] = useState({ condition: false, message: '' });
  const [requestUnitsError, setRequestUnitsError] = useState({ condition: false, message: '' });

  const { user } = useAuth();
  console.log(user && user.blood_type);

  const SubmitRequest = async () => {
    let allFieldsFilled = true;
  
    if (requestDetails.trim() === '') {
      setRequestDetailError({ condition: true, message: 'This field is required' });
      allFieldsFilled = false;
    } else {
      setRequestDetailError({ condition: false, message: '' });
    }
  
    if (requestUnits.trim() === '') {
      setRequestUnitsError({ condition: true, message: 'This field is required' });
      allFieldsFilled = false;
    } else {
      setRequestUnitsError({ condition: false, message: '' });
    }
  
    // Check blood type validity only if all fields are filled
    if (allFieldsFilled) {
      if (user && user.blood_type === '--') {
        setBloodTypeValid(true);
        return; // Exit the function if blood type is invalid
      }
  
      const { error } = await supabase
        .from('blood_request')
        .insert([
          {
            user_id: user.id,
            blood_type: user.blood_type,
            units: requestUnits,
            description: description,
            anonymous: isRequestAnonymous
          }
        ]);
  
      if (error) {
        Alert.alert("ERROR INSERTING REQUEST:", error.message);
      } else {
        Alert.alert("Request Successful", "Your blood request has been submitted.");
        onRequestClose(); 
        // Reset fields after successful submission
        setRequestDetails('');
        setRequestUnits('');
        setDescription('');
      }
    }
  };
  

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
          <InputBox
            detail="You are requesting for?"
            value={requestDetails}
            onChangeText={(val) => {
              setRequestDetails(val);
              // Validate as the user types
              if (val.trim() !== '') setRequestDetailError({ condition: false, message: '' });
            }}
            title="Enter your request details here"
            borderWidth={requestDetailError.condition ? 2 : 1}
            borderColor={requestDetailError.condition ? 'red' : '#EAEAEA'}
            message={requestDetailError} 
          />
          <InputBox
            detail="How many blood bags needed?"
            value={requestUnits}
            keyboardType={'numeric'}
            onChangeText={(val) => {
              setRequestUnits(val);
              if (val.trim() !== '') setRequestUnitsError({ condition: false, message: '' });
            }}
            title="Enter the number of units needed"
            borderWidth={requestUnitsError.condition ? 2 : 1}
            borderColor={requestUnitsError.condition ? 'red' : '#EAEAEA'}
            message={requestUnitsError}
          />
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
              AlterTitle={'Turning on Anonymous Request will hide your name and profile from the feed.'}
            />
          </View>
          <CustomBtn title={'Post Request'} onPress={SubmitRequest} />
        </ScrollView>
      </View>
    </Modal>
  );
};

export default ModalCreateBloodRequest;
