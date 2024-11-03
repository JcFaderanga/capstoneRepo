import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import Elevated from './elevated';
import ToggleButton from './UI/button/toggleBtn';
import { useAuth } from '../context/authContext';
import { supabase } from '../lib/supabase';
import { ShowCompatibility } from '../services/bloodcopatibilty';
const ProfileDetails = () => {
 const { user } = useAuth();
  const [availability, setAvailability] = useState(user && user.donation_availability);
  const [anonymous, setAnonymous] = useState(user && user.anonymous_donor);
  var alert_title = '';
  var alert_description = '';
  if(user && user.blood_type === '--'){
     alert_title = 'Invalid Blood Group';
     alert_description = 'Please visit the nearest blood center to confirm your blood type or update your records to be eligible as a donor.';
  }else{
     alert_title = 'Available to Donate';
     alert_description = 'Turning on Available to Donate will display your profile in the list of available donors.';
  }

  const handleDonorAvailability = async (val) => {
    if(user.blood_type === '--'){
      console.log(user.blood_type, " is invalid blood type",  user.donation_availability)
      return setAvailability(false);
    }
    const { error } = await supabase
      .from('profile')
      .update({ donation_availability: val })
      .eq('id', user.id);

    if (error) {
      console.error('Error updating availability:', error);
      setAvailability(!val);
    }
    console.log(user.blood_type, "set as true and donor avail is = ", user.donation_availability)
  };

  const handleAnonymousDonor = async (val) => {
    const { error } = await supabase
      .from('profile')
      .update({ anonymous_donor: val })
      .eq('id', user.id);

    if (error) {
      console.error('Error updating anonymous donor status:', error);
      setAnonymous(!val);
    }
  };

  return (
    <View className="w-[93%] mx-auto">
      <Text className="text-sm mt-4">Donation Information</Text>
      <View className="flex-row ">
        <Elevated width={100} height={85}>
          <Pressable
            className="flex-1 flex-row items-center justify-center px-3 pt-2 rounded-t-[10px] bg-[#3A3A3A]"
            onPress={() => ShowCompatibility(user.blood_type)}
          >
            <View className="flex-row items-center justify-center gap-1">
              <Image
                source={require('../assets/icon/bloodType.png')}
                className="w-6"
                resizeMode="contain"
              />
              <Text className="font-bold text-[15px]"></Text>
            </View>
            <Text className="text-white font-bold text-3xl">
              {user && user.blood_type}
            </Text>
          </Pressable>
          <View className="flex w-full items-center bg-[#3A3A3A] rounded-b-[10px] pb-2">
            <Text className="text-white font-bold">Blood Group</Text>
          </View>
        </Elevated>

        <View className="flex-1 pl-4">
          <Elevated width={'100%'} height={85}>
            <View className="flex-row h-full">
              <View className="flex-1 justify-center items-center ">
                <Text className="text-xs font-bold">Unit Donated</Text>
                <View className="flex-row items-center h-[60]">
                  <Image
                    source={require('../assets/icon/donated.png')}
                    className="w-10"
                    resizeMode="contain"
                  />
                  <Text className="font-bold text-[20px] pl-2">--</Text>
                </View>
              </View>

              <View className="flex-1 justify-center items-center ">
                <Text className="text-xs font-bold">Next Donation</Text>
                <View className="flex-row items-center h-[60]">
                  <Image
                    source={require('../assets/icon/nextDonation.png')}
                    className="w-10"
                    resizeMode="contain"
                  />
                  <Text className="font-bold text-[20px] pl-2">--</Text>
                </View>
              </View>
            </View>
          </Elevated>
        </View>
      </View>

      <Text className="text-sm mt-4">Donation Settings</Text>
      <View>
        <Elevated width={'100%'} height={50}>
          <View className="flex-1 flex-row justify-between items-center px-6">
            <View className="flex-row items-center gap-3">
              <Image
                source={require('../assets/icon/availability.png')}
                className="w-7"
                resizeMode="contain"
              />
              <Text className="font-bold text-[15px]">Available to Donate</Text>
            </View>
            <ToggleButton
              AlertTitle={alert_title}
              AlterDescription={alert_description}
              onPress={handleDonorAvailability}
              status={availability}
            />
          </View>
        </Elevated>
      </View>

      <Elevated width={'100%'} height={50}>
        <View className="flex-1 flex-row justify-between items-center px-6">
          <View className="flex-row items-center gap-3">
            <Image
              source={require('../assets/icon/lock.png')}
              className="w-7"
              resizeMode="contain"
            />
            <Text className="font-bold text-[15px]">Anonymous Donor</Text>
          </View>
          <ToggleButton
            AlertTitle={'Anonymous Donor'}
            AlterDescription={
              'Turning on Anonymous Donor will hide your name and profile from the donor list.'
            }
            onPress={handleAnonymousDonor}
            status={anonymous}
          />
        </View>
      </Elevated>
    </View>
  );
};

export default ProfileDetails;

const styles = StyleSheet.create({});
