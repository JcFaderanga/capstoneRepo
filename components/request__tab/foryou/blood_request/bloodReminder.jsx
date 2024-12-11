import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ShowCompatibility } from '../../../../hooks/blood_validation/useBloodCopatibilty';
import { useAuth } from '../../../../context/authContext';
const bloodReminder = () => {
  const {user} = useAuth();

 const compatibility = ShowCompatibility(user.blood_type)
 const {canDonateTo, canReceiveFrom} = compatibility;

  return (
    <View className="w-full border-b border-gray-200 py-3">
        <Text className='text-lg '>
            Your blood type 
            <Text className="text-primary_red font-bold"> {user.blood_type} </Text> 
            can donate to<Text className="text-primary_red font-bold"> {canDonateTo.join(' , ')} </Text>
            blood types and can receive blood from donors with
            <Text className="text-primary_red font-bold"> {canReceiveFrom.join(' , ')} </Text>
              blood types.
              <Text className="text-primary_red"> Learn more.</Text> 
        </Text>
    </View>
  )
}

export default bloodReminder

const styles = StyleSheet.create({})