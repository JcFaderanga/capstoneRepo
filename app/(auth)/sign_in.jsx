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
import InputBox from '../../components/inputBox'
import CustomButtonWithIcon from '../../components/buttonWithIcon'

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [borderColor, setBorderColor] = useState('#D9D9D9');
  const [borderWidth, setBorderWidth] = useState(2);

  const handleSignIn = () => {
    if (email === '' || password === '') {
      setBorderColor('red');
      setBorderWidth(3);
    } else {
      setBorderColor('#D9D9D9');
      console.log('Sign In button pressed');
      router.push('../(tabs)/home');
      // Handle sign-in logic here
    }
   // router.push('../(tabs)/home');
   //router.push('./sign_up/gender');
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

                    <InputBox
                          keyboardType={"email-address"}
                          value={email}
                          detail="Email:"
                          onChangeText={(EmailVal) => setEmail(EmailVal)}
                          title="Enter Email here"
                          borderWidth={borderWidth}
                          borderColor={borderColor}
                      />
                      <InputBox
                          value={password}
                          detail="Password:"
                          onChangeText={(PassVal) => setPassword(PassVal)}
                          title=""
                          borderWidth={borderWidth}
                          borderColor={borderColor}
                      />
                      <CustomBtn
                        title={'Sign In'}
                        onPress={handleSignIn}
                      />
                        <View className="m-[25]">
                          <Text className="color-customgray text-sm mx-auto">Dont have an Account?
                            <Link href={'./Email'}>
                              <Text className="font-interbold color-primaryRed"
                              > Sign up</Text>
                            </Link> 
                          </Text>
                      </View>
                  </View>{/** end sign in using phone */}


              </View>{/* End container*/}
          </ScrollView>
      </SafeAreaView>      
    </View>
  )
}

export default SignIn

