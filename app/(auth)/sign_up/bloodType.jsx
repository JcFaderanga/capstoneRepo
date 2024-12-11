import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import ThemeButton from '../../../components/UI/button/themeButton'
import { useRouter } from 'expo-router';
import SignUpHeader from '../../../components/signUpHeader';
import { useRegistrationStorage } from '../../../hooks/sign_up_hooks/useRegistrationStorage';
const BloodType = ({type, onPress, isSelected }) => {
    return (
      <View>
        <TouchableOpacity 
        onPress={()=> onPress(type)}
        style={[isSelected && styles.bgBtn]}
        className="w-[75] h-[75] m-1 border-2 border-primary_red rounded-[25px] flex justify-center items-center">
            <Text style={[isSelected && styles.txtColor]} className="text-2xl font-bold text-primary_red">{type}</Text>
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
    const{addDetails} = useRegistrationStorage();
   const router = useRouter();
   
    //pass value to next path
    function handlePressed(){
        addDetails({blood_type: bloodType})
      router.push('./termAndCondition');
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
        <ThemeButton
        title={'Continue'}
        onPress={handlePressed}
        />
    </View>
  )
}

export default BloodGroup


