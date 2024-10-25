import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CustomBtn from '../../../components/UI/button/button'
import { useRouter, useLocalSearchParams } from 'expo-router';
import SignUpHeader from '../../../components/signUpHeader';
const BloodType = ({type, onPress, isSelected }) => {
    return (
      <View>
        <TouchableOpacity 
        onPress={()=> onPress(type)}
        style={[isSelected && styles.bgBtn]}
        className="w-[75] h-[75] m-1 border-2 border-primaryRed rounded-[25px] flex justify-center items-center">
            <Text style={[isSelected && styles.txtColor]} className="text-2xl font-bold text-primaryRed">{type}</Text>
        </TouchableOpacity>
      </View>
    )
  }
  const styles = StyleSheet.create({
    bgBtn:{
      backgroundColor: '#F42F47'
    },
    txtColor:{
      color: 'white',
    }
  })
const BloodGroup = () => {
  const [bloodType, getSelectedType] = useState('--');
  const typeList = ["A+","A-","B+","B-","O+","O-","AB+","AB-"];

   const router = useRouter();
   const params = useLocalSearchParams();
    //pass value to next path
    function handlePressed(){
      router.push({
        pathname: './termAndCondition',
        params: {...params,bloodType },
      });
    } 
  return (
    <View className="bg-white h-full">
        <SignUpHeader
                text={`What's your Blood Type?`}
            />
            <View className="w-[90%] mx-auto my-2">
              <Text  className="text-base text-[#B8B8B8] text-center">
                  If you Don't know your blood type just skip for now, click continue.
              </Text>
            </View>
        <View className="w-full mt-8">
            <View className="flex-row flex-wrap justify-center">
                {
                    typeList.map((type, index)=>(
                        <BloodType
                            key={index}
                            type={type}
                            onPress={(type)=>(
                                     (type === bloodType) 
                                     ?  getSelectedType("--") : getSelectedType(type))}
                            isSelected={type === bloodType}
                        />
                    ))
                }
            </View>
        </View>
        <CustomBtn
        title={'Continue'}
        onPress={handlePressed}
        />
    </View>
  )
}

export default BloodGroup


