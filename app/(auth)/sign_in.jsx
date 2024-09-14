import {
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native'
import style from '../../style/style';
import { StatusBar } from "expo-status-bar"
import {useState, useEffect} from 'react'
import { Link, Redirect, router } from 'expo-router'
import React from 'react'
import CustomBtn from '../../components/button'
import InputBoxNum from '../../components/inputBoxNum'
import CustomButtonWithIcon from '../../components/buttonWithIcon'

const SignIn = () => {

  
  const [number, setPhoneNumber] = useState('');
  const [borderColor, setBorderColor] = useState('#D9D9D9');
  const [borderWidth, setBorderWidth] = useState(2);

  const handleSignIn = () => {
    router.push('../(tabs)/home');
    if (number.trim() === '') {
      setBorderColor('red');
      setBorderWidth(3);
    } else {
      setBorderColor('#D9D9D9');
      console.log('Sign In button pressed');
      router.push('../(tabs)/home');
      // Handle sign-in logic here
    }
  };
  return (
    <View>
        <SafeAreaView className="bg-white h-full">
          <ScrollView className="bg-white">
              <View className=" flex-1 items-center bg-white">


                  <View className=" w-80 flex-row justify-center mt-32 mb-[40px]">{/*logo div*/}
                      <View className="w-2/5 h-mx">
                      <Image className="w-24 h-24"
                          source={require('../../assets/icon/redcross.png')}
                      />
                      </View>
                      <View className="flex-1 h-mx ml-1 ">
                          <Text className="text-4xl text-customgray font-interbold">Philippine Red Cross</Text>
                          <Text className="text-base text-customgray font-interbold">Muntinlupa Branch </Text>
                      </View>
                  </View>


                  <View className="w-auto h-auto">{/**form-group container */}

                      <InputBoxNum
                        value={number}
                        onChangeText={(numVal) => {
                          setBorderColor('gray');
                          setBorderWidth(2);
                          setPhoneNumber(numVal);
                        }}
                        borderWidth={borderWidth}
                        placeholder="Enter your number"
                        borderColor={borderColor}
                      />
                      <CustomBtn
                        title={'Sign In'}
                        onPress={handleSignIn}
                      />

                        <View className="m-[25]">
                          <Text className="color-customgray text-sm mx-auto">Dont have an Account?
                            <Link href={'./Sign Up'}>
                              <Text className="font-interbold color-primaryRed"
                              > Sign up</Text>
                            </Link> 
                          </Text>
                      </View>
                  </View>{/** end sign in using phone */}


                  <View>{/** Sign in using social media*/}
                      <View className="flex-row items-center mx-auto mb-6">
                          <View className="border" style={style.line}></View>
                              <Text className="ml-5 mr-5 text-base color-gray-400 font-bold">OR</Text>
                          <View className="border" style={style.line}></View>
                      </View>

                      <CustomButtonWithIcon
                          title = "Continue with facebook"
                          url = {require('../../assets/icon/facebook.png')}
                          iconStyle = {style.facebookIconSize}
                          btnBg = {style.buttonFb}
                          color = {'text-white'}
                          
                      />

                      <CustomButtonWithIcon
                          title = "Continue with Google"
                          url = {require('../../assets/icon/google.png')}
                          iconStyle = {style.googleIconSize}
                          btnBg = {style.buttonGoogle}
                          color = {'text-customgray'}
                      />
                  </View>{/* End social media logins*/}
                  
              </View>{/* End container*/}
          </ScrollView>
      </SafeAreaView>      
    </View>
  )
}

export default SignIn

