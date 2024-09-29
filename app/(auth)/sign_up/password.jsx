import { Text, View } from 'react-native';
import React, { useState } from 'react';
import Require from '../../../components/require';
import CustomBtn from '../../../components/UI/button/button'
import InputBox from '../../../components/UI/inputs/inputBox'
import SignUpHeader from '../../../components/signUpHeader';
import { useRouter, useLocalSearchParams } from 'expo-router';
const Password = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState({ condition: false, message: '' });
  const [confirmPasswordError, setConfirmPasswordError] = useState({ condition: false, message: '' });
  const router = useRouter();
  const params = useLocalSearchParams();
  const validatePassword = () => {

    if (password === '') {
      setPasswordError({ condition: true, message: 'Invalid Password' });
     
    } else if (password.length < 6) {
      setPasswordError({ condition: true, message: 'At least 6 Characters' });
     
    } else {
      setPasswordError({ condition: false, message: '' });
    }

    if (confirmPassword !== password) {
      setConfirmPasswordError({ condition: true, message: "Password didn't match" });
    
    } else {
      setConfirmPasswordError({ condition: false, message: '' });
      router.push({pathname:'./PhoneNumber',
      params: {...params, password }});
    }
  };
  // const setBorder = {
  //   borderWidth: passwordError.condition || confirmPasswordError.condition ? 2 : 1,
  //   borderColor: confirmPasswordError.condition
  //     ? 'red'
  //     : (password === '' ? '#D9D9D9' : (confirmPassword === password ? '#008000' : 'red')),
  // };

  return (
    <View>
      <SignUpHeader text={"Create your Password"} />
      <InputBox
        keyboardType="default"
        value={password}
        onChangeText={(passVal) => {
          setPassword(passVal);
          setPasswordError({ condition: false, message: '' });
        }}
        title="Enter your Password here"
        borderWidth={passwordError.condition ? 2 : 1}
        borderColor={passwordError.condition ? 'red' : '#D9D9D9'}
        autoCapitalize="none"
        message={passwordError}
        secureTextEntry
      />
      <InputBox
        keyboardType="default"
        value={confirmPassword}
        onChangeText={(passVal) => {
          setConfirmPassword(passVal);
          setConfirmPasswordError({ condition: false, message: '' });
        }}
        title="Confirm your Password"
        borderWidth={confirmPasswordError.condition ? 2 : 1}
        borderColor={confirmPasswordError.condition ? 'red' : '#D9D9D9'}
        message={confirmPasswordError}
        secureTextEntry
        autoCapitalize="none"
        customize={{ display: "none" }}
      />
      <CustomBtn
        onPress={() => {
          if (validatePassword()) {
            // Proceed to the next step
          }
        }}
        title={'Continue'}
      />
    </View>
  );
};

export default Password;
