import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  Alert,
  Pressable
} from 'react-native';
import React, { useState } from 'react';
import { Link } from 'expo-router';
import ThemeButton from '../../components/UI/button/themeButton';
import InputBox from '../../components/UI/inputs/inputBox';
import { supabase } from '../../lib/supabase';
import ThemeContainer from '../../components/UI/themeContainer';
import usePasswordVisible from '../../hooks/sign_in_hooks/usePasswordVisible';
import PasswordVisible from '../../components/sign_in__componets/passwordVisible';
import useEmailValidation from '../../hooks/validation/useEmailValidation';
import usePasswordValidation from '../../hooks/validation/usePasswordValidation';
import useSignIn from '../../hooks/sign_in_hooks/useSignIn';
const SignIn = () => {
  const [user, setUser] = useState({email: '',password: ''})
  const [isError, setError] = useState(null);
  
  const {isLoading, error: loginError ,SignInWithEmail} = useSignIn();
  const { isVisible, togglePasswordVisibility } = usePasswordVisible();
  const {emailError,setEmailError } = useEmailValidation(user?.email);
  const {passwordError, setPasswordError} = usePasswordValidation(user?.password)
 

  const handleInputChange = (field, value) => {
    setUser((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  const handleSignIn = () => {
    const { email, password } = user;

    if(!email || !password ){
      setEmailError('Email is required!');
      setPasswordError('Password is required!');
    }else if(loginError){
      setError(true)
    }
    else{
      setError(false);
    }
    SignInWithEmail(email, password);
  };

  function loginFaild(){
      if(loginError){
      return(
        <View className="h-14 w-full flex items-center bg-red-100  justify-center rounded-[15px]">
          <Text className="text-primary_red text-base font-interRegularBold">{loginError}</Text>
        </View>
      )
    }
  }
  return (
    <ThemeContainer bgColor={'white'}>
          <View className="flex-1 items-center">
              <View className="w-80 flex-row justify-center mt-28 mb-[40px]">
                  <View className="w-2/5 h-mx ">
                      <Image className="w-24 h-24" source={require('../../assets/icon/redcross.png')} />
                  </View>
                  <View className="flex-1">
                      <Text className="text-4xl text-primary_gray font-interbold">Philippine Red Cross</Text>
                      <Text className="text-base text-primary_gray font-interbold">Muntinlupa Branch</Text>
                  </View>
              </View>
              {loginFaild()}
              <View className="w-auto h-auto">
                  <InputBox
                      keyboardType="email-address"
                      value={user.email}
                      onChangeText={(val) => handleInputChange('email', val)}
                      title="Enter Email here"
                      customize={{ display: "none" }}
                      validationError = {emailError || isError}
                  />
                <View>
                    <InputBox
                        value={user.password}
                        onChangeText={(val) => handleInputChange('password', val)}
                        title="Enter Password here"
                        secureTextEntry = {!isVisible}
                        autoCapitalize="none"
                        customize={{ display: "none" }} //to remove title of input
                        validationError = {passwordError || isError}
                    />
                    <PasswordVisible onPress={togglePasswordVisibility} isVisible={isVisible}/>
                </View>
                  <ThemeButton
                    title="Sign In"
                    onPress={handleSignIn}
                    disable={isLoading}
                    isLoading={isLoading}
                  />
                  <View className="m-[25]">
                      <Text className="color-primary_gray text-base mx-auto">Don't have an Account?
                          <Link href={'./Email'}>
                              <Text className="font-interbold text-base color-primary_red"> Sign up</Text>
                          </Link>
                      </Text>
                  </View>
              </View>
          </View>
  </ThemeContainer>
  );
};

export default SignIn;
