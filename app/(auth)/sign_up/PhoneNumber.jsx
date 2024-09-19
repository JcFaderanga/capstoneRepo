import {
  Text,
  View,
  SafeAreaView,
} from 'react-native'
import {useState} from 'react'
import {router } from 'expo-router'
import { StatusBar } from "expo-status-bar"
import React from 'react'
import InputBoxNum from '../../../components/inputBoxNum' 
import CustomBtn from '../../../components/button'
import { useRouter, useLocalSearchParams } from 'expo-router';
import SignUpHeader from '../../../components/signUpHeader'
const sign_up = () => {
  const [number, setPhoneNumber] = useState('');
  const [PhoneNumberError, SetPhoneNumberError] = useState({condition: false, message:''});

  const router = useRouter();
  const params = useLocalSearchParams();
 

    const handleSignIn = () => {

      if ( number.trim()==='' || number.length !== 10) {
        SetPhoneNumberError({condition: true,message:'Invalid Number'});
    } else {
      SetPhoneNumberError({condition: false,message:''});
          router.push({pathname:'./Profile',
            params: {...params, number }});
      console.log('Sign In button pressed Phone number:', number);
      // Handle sign-in logic here
    }
  };
   
  return (
    <View>
      <SafeAreaView className="bg-white h-full">
      <SignUpHeader
                text={`what's your Phone Number?`}
            />
      <InputBoxNum
          value={number}
          onChangeText={(numVal) => {
            SetPhoneNumberError({ condition: false, message: '' });
            setPhoneNumber(numVal);
          }}
          borderWidth={PhoneNumberError.condition? 2 : 1}
          placeholder="Enter your number"
          borderColor={PhoneNumberError.condition? "red" : "#D9D9D9"}
          message={PhoneNumberError}
      />
      <CustomBtn
          title={'Continue'}
          onPress={handleSignIn}
      />
      </SafeAreaView>
      <StatusBar backgroundColor="#F42F47" style="light" />
    </View>
  )
}

export default sign_up
