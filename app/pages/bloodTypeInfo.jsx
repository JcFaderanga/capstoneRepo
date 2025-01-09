import { StyleSheet, Text, View,Pressable,ScrollView } from 'react-native'
import React from 'react'
import { useLocalSearchParams, router } from 'expo-router';
import ThemeContainer from '../../components/UI/themeContainer';
import Ionicons from '@expo/vector-icons/Ionicons';
import BloodReminder from '../../components/request__tab/foryou/blood_request/bloodReminder';
import { BloodTypeDescription } from '../../components/blood_type/bloodTypeDescriptions';

const BloodTypeInfo = () => {
   const params = useLocalSearchParams();
   if(!params) return;
   const {blood_type} = params;

  return (
    <ThemeContainer bgColor={'white'}>
       {/* #f1f5f9 */}
        <View className="w-full h-16 bg-primary_red flex-row justify-between items-center px-5">
          <Pressable onPress={()=> router.back()}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </Pressable>
            <Text className="text-center font-bold text-lg tracking-wide text-white">
              Blood Type {blood_type}
            </Text>
            <Text className="p-1"></Text>
        </View>
        <ScrollView>
          <View className=" bg-white my-2 px-4 ">
            <BloodReminder blood_type={blood_type}/>
            {BloodTypeDescription[blood_type]}
          </View>
        </ScrollView>
    </ThemeContainer>
  )
}

export default BloodTypeInfo

const styles = StyleSheet.create({})