import { StyleSheet, Text, View, Image,FlatList, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import UseFetchDonation from '../../hooks/blood_donation/fetchDonation'
import { useAuth } from '../../context/authContext'
import useFetchUser from '../../hooks/user/useFetchUser'
import { useRouter } from 'expo-router';
const DonationHistory = () => {
  const {user} = useAuth();
const {donationData,error, FetchDonation} = UseFetchDonation();

console.log('donation data', donationData)
console.log('donation data error', error)

useEffect(()=>{
  FetchDonation(user?.id);
},[user])

  return (
    <View className="h-full w-full bg-white ">
      <FlatList
        data={donationData || []}
        keyExtractor={(item)=> item?.blood_donation_id?.toString()}
        renderItem={({item})=>(
          <DonationBox donationData={item}/>
        )}
      />
    </View>
  )
}
export default DonationHistory

const DonationBox = ({donationData})=>{
const router = useRouter();
const {user, fetchUser}= useFetchUser();
useEffect(()=>{
  fetchUser(donationData?.recipient)
},[donationData])

if(!user) return;
const {first_name, last_name, blood_type} = user;
const unitDonatedVolume = donationData.units_donated * 450;
const recipient = donationData?.anonymous_donation 
      ? 'Anonymous' 
      : (first_name + '' + last_name);

  const statusImages = {
    complete: require('../../assets/icon/complete.png'),
    cancelled: require('../../assets/icon/cancelled.png'),
    pending: require('../../assets/icon/pending.png'),
  };
  
  const formattedDate = (sched_date) => {
    const dateObj = new Date(sched_date);
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleDonationReview = ()=>{
    router.push({
      pathname: '../pages/donationReview',
      params: { donation_details: JSON.stringify(donationData)},
    })
  }
  return(
  <Pressable className="px-4" onPress={handleDonationReview}>
    <View className="bg-slate-100 w-full rounded-3xl px-4 py-2 my-2 overflow-hidden">
        <View className="flex-row h-28">
            <View className=" flex justify-center">
                <Text className="font-bold text-lg">Recipient: <Text className="font-normal">{recipient}</Text></Text>
                <Text className="font-bold text-base pt-1">Volume: <Text className="font-normal">
                  {donationData.units_donated}
                  {donationData.units_donated >= 1 ? 'units' : 'unit'} ({unitDonatedVolume}ml)
                  </Text>
                </Text>
                <Text className="font-bold text-base pt-1">Schedule: <Text className="font-normal">
                  {formattedDate(donationData.schedule_date)}</Text>
                </Text>
            </View>
            <View>
                <Image source={statusImages[donationData?.status]}
                  className="w-52 h-52 absolute top-[-60px] right-[-220px]" resizeMode='contain'/>
            </View>
        </View>
        <View className="flex-row justify-between items-center border-t-2 border-white py-3">
            <View className="flex-row items-center">
              <Image source={require('../../assets/icon/donated.png')} className="w-10 h-11 mr-3" resizeMode='contain'/>
              <Text className="font-bold text-lg">Whole Blood</Text>
            </View>
            <Text className="font-bold text-2xl text-primary_red">{blood_type}</Text>
        </View>
    </View>
  </Pressable>
  ) 
}