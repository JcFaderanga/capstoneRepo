import { StyleSheet, Text, View, Image, ScrollView, Pressable } from 'react-native'
import React from 'react'
import Unavailable from '../../components/unavailable'
import * as Progress from 'react-native-progress';
import { useAuth } from '../../context/authContext';
import { LongDateFormat } from '../../constant/timeStamp';
const BloodBank = () => {
  const {user} = useAuth();
  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  return (
  <ScrollView className="w-full h-full bg-white">
    <View className="px-4 py-2">
      <Text className="font-bold text-2xl p-2">Did you Know?</Text>
      <View className=" px-5 py-5 rounded-2xl bg-slate-100">
        <Text className="text-lg">
          {user && user.blood_type ? bloodTypeTrivia[user.blood_type] : ''}
        </Text>
      </View> 
    </View>
    <View className="mt-12 w-full px-4">
      <View className="w-full rounded-sm ">
        <Text className="font-bold text-xl text-center">
        Make a Life-Saving Contribution
        </Text>
        <View className="w-full my-2 rounded-2xl border border-stone-50">
          <View className="mx-4 mb-3 rounded-xl p-3 px-3">
            <Text className="text-center text-gray-500">
              Every donation has the potential to save multiple lives. Be a part of it!
            </Text>
          </View>
          <Pressable className="bg-primary_red mx-4 mb-7 rounded-xl py-4" >
            <Text className="text-center text-white font-bold">Set Up Your Donation</Text>
          </Pressable>
        </View>
      </View>
    </View>
    <View className="px-4">
        <Text className="font-bold py-4 text-lg text-center">Current Blood Stocks as of {LongDateFormat(new Date)}</Text> 
    </View>
      <View className="w-full h-full bg-white flex-row justify-center items-center flex-wrap">
        <ProgressType type={'A+'} stocks={.4} stocks_label={'Medium'}/>
        <ProgressType type={'B+'} stocks={.7} stocks_label={'High'}/>
        <ProgressType type={'O+'} stocks={.7} stocks_label={'High'}/>
        <ProgressType type={'AB+'} stocks={.2} stocks_label={'Low'}/>
        <ProgressType type={'O-'} stocks={.9} stocks_label={'High'}/>
        <ProgressType type={'A-'} stocks={.3} stocks_label={'Low'}/>
        <ProgressType type={'B-'} stocks={.5} stocks_label={'Meduim'}/>
        <ProgressType type={'AB-'} stocks={.6} stocks_label={'Medium'}/>
      </View>
      <View className="my-20">
        <Text></Text>
      </View>
  </ScrollView>
  )
}
export default BloodBank

const ProgressType = ({type, stocks, stocks_label})=>{
  return(
    <View className="pt-8 px-9 border rounded-xl border-slate-300 m-1">
      <Progress.Circle
          progress={stocks} size={100} borderWidth={0}
          color="#F42F47" thickness={9} showsText={true} 
          formatText={()=> type} 
          textStyle={styles.progressText} unfilledColor="#E5E5E5" 
          animated={true} 
      />
      <Text className="text-center pt-2 pb-7">{stocks_label}</Text>
    </View>
  )
}

const bloodTypeTrivia = {
  "A+": "Did you know that your blood type A+ is one of the most common blood types, found in about 34% of the population? It's especially important for platelet donations.",
  "A-": "Did you know that your blood type A- is a rare blood type, found in only about 6% of the population? It can be donated to A, AB, and other A- patients.",
  "B+": "Did you know that your blood type B+ is present in about 8.5% of the population? It's compatible with both B and AB blood groups for donations.",
  "B-": "Did you know that your blood type B- is one of the rarest blood types, occurring in only 1.5% of the population? It’s often in high demand for emergencies.",
  "O+": "Did you know that your blood type O+ is the most common blood type, found in about 38% of the population? It’s a universal donor for positive blood types.",
  "O-": "Did you know that your blood type O- is the universal blood donor type, used in emergencies? Only 7% of the population has it, making it crucial for transfusions.",
  "AB+": "Did you know that your blood type AB+ is the universal plasma donor type, compatible with all blood groups? It’s relatively rare, found in about 3.4% of people.",
  "AB-": "Did you know that your blood type AB- is the rarest blood type, present in less than 1% of the population? It’s universal for AB recipients, making it highly valuable."
};

const styles = StyleSheet.create({
  progressText: {
    color: '#F42F47',
    fontSize: 40,
    fontWeight: 'bold',
  },
})