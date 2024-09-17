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
  const [borderColor, setBorderColor] = useState('#EAEAEA');
  const [borderWidth, setBorderWidth] = useState(1);
  
  const router = useRouter();
  const params = useLocalSearchParams();
 
    const handleSignIn = () => {
    if (number.trim() === '' || number.length !== 10) {
      setBorderColor('red');
      setBorderWidth(2);
    } else {
      setBorderColor('#EAEAEA');
      setBorderWidth(1);
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
            setBorderColor('#EAEAEA');
            setBorderWidth(2);
            setPhoneNumber(numVal);
          }}
          borderWidth={borderWidth}
          placeholder="Enter your number"
          borderColor={borderColor}
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
