import {
  Text,
  View,
  SafeAreaView,
} from 'react-native'
import {useState} from 'react'
import { StatusBar } from "expo-status-bar"
import React from 'react'
import ThemeButton from '../../../components/UI/button/themeButton'
import InputBoxNum from '../../../components/UI/inputs/inputBoxNum'
import { useRouter, useLocalSearchParams } from 'expo-router';
import SignUpHeader from '../../../components/signUpHeader'
import { useRegistrationStorage } from '../../../hooks/sign_up_hooks/useRegistrationStorage'

const sign_up = () => {
  const [number, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');

  const { addDetails } = useRegistrationStorage();
  const router = useRouter();
 

    const handleSignIn = () => {
      if ( number.trim()==='' || number.length !== 10) {
        setPhoneNumberError('Invalid Phone Number');
    } else {
          router.push('./profile');
          addDetails({phone_number: number})
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
            setPhoneNumberError('');
            setPhoneNumber(numVal);
          }}
          placeholder="Enter your number"
          validationError={phoneNumberError}
      />
      <ThemeButton
          title={'Continue'}
          onPress={handleSignIn}
      />
      </SafeAreaView>
      <StatusBar backgroundColor="#F42F47" style="light" />
    </View>
  )
}

export default sign_up
