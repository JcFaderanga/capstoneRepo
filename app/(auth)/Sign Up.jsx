import {
  Text,
  View,
  SafeAreaView,
} from 'react-native'
import {useState} from 'react'
import {router } from 'expo-router'
import { StatusBar } from "expo-status-bar"
import React from 'react'
import InputBoxNum from '../../components/inputBoxNum' 
import CustomBtn from '../../components/button'
import { useRouter } from 'expo-router';

const sign_up = () => {
  const [number, setPhoneNumber] = useState('');
  const [borderColor, setBorderColor] = useState('#EAEAEA');
  const [borderWidth, setBorderWidth] = useState(1);
  const router = useRouter();

 
    const handleSignIn = () => {
    if (number.trim() === '' || number.length !== 10) {
      setBorderColor('red');
      setBorderWidth(2);
    } else {
      setBorderColor('#EAEAEA');
      setBorderWidth(1);
          router.push({pathname:'./sign_up/Email',
            params: { number }});
      console.log('Sign In button pressed Phone number:', number);
      // Handle sign-in logic here
    }
  };
   
  return (
    <View>
      <SafeAreaView className="bg-white h-full">
        <View className="w-full h-[100] flex items-center justify-end ">
          <Text className="text-customgray text-xl font-interRegularBold">What's your Phone Number?</Text>
        </View>
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
