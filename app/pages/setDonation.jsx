import { StyleSheet, Text, View,Pressable } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Unavailable from '../../components/unavailable'
const SetDonation = () => {

const dateToDay = new Date(); 
const dateNextWeek = new Date().setDate(dateToDay.getDate() + 7);
const options = { 
  weekday: 'long', 
  month: 'long',   
  day: 'numeric',  
};
const format = new Intl.DateTimeFormat('en-US', options);
const dateDay = format.format(dateToDay);
const dateDayNextWeek = format.format(dateNextWeek);


  return (
    <View className = "w-full h-full bg-white px-4 pt-10">
        <View className="w-full opacity-50">
            <Pressable 
            className="w-full h-28 bg-slate-100 rounded-3xl px-6 mb-4 flex-row items-center">
                <View className=" h-14 w-14 rounded-xl bg-white justify-center">
                   <Text className="font-bold text-primary_red text-2xl text-center">{dateToDay.getDate()}</Text>
                </View>     
            <View className="flex-1 mx-4">
                <Text className="font-bold text-xl">Today</Text>
                <Text className="">{dateDay}</Text>
            </View>
            </Pressable>
        </View>
        <View className="w-full opacity-50">
            <Pressable 
            className="w-full h-28 bg-slate-100 rounded-3xl px-6 mb-4 flex-row items-center ">
                <View className=" p-4 rounded-xl bg-white ">
                    <FontAwesome name="calendar" size={20} color="#F42F47" />
                </View>
                
            <View className="flex-1 mx-4">
                <Text className="font-bold text-xl">Next week</Text>
                <Text className="">{dateDayNextWeek}</Text>
            </View>
            </Pressable>
        </View>
        <Unavailable/>
    </View>
  )
}

export default SetDonation
const styles = StyleSheet.create({})