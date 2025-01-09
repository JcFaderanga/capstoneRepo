import { StyleSheet, Text, View,ScrollView } from 'react-native'
import React,{useEffect, useState, useRef } from 'react'
import Unavailable from '../../components/unavailable'
import Ionicons from '@expo/vector-icons/Ionicons';
import DonationDriveBox from '../../components/donationDrive';
import PreRegister from './bottomSheet/donationDrvie/sheetPreRegister';
const DonationDrive = () => {
const [selectedDrive, setSelectedDrive] = useState(null);
  const donationDriveDetails = {
    title: 'Festival Mall, Muntilupa City, 2nd floor',
    time_posted: 'Posted 1 hour ago',
    address: 'Filinvest Corporate City, Commerce Ave, Muntinlupa, Metro Manila',
    date: 'Monday, January 13',
    time: '10:00 AM - 5:00 PM'
  }
  const donationDriveDetails1 = {
    title: 'Riverbanks Center Riverbanks Center, Outlet Avenue',
    time_posted: 'Posted 2 hours ago',
    address: '1800 Riverbanks Ave, Marikina, 1800 Metro Manila',
    date: 'Saturday, January 11',
    time: '10:00 AM - 4:00 PM'
  }
  const donationDriveDetails2 = {
    title: 'SM Center Muntinlupa 2nd Floor ',
    time_posted: 'Posted 4 hour ago',
    address: 'SM Center, Muntinlupa, 1774 Metro Manila',
    date: 'Saturday, January 11',
    time: '11:00 AM - 3:30 PM '
  }
    const expandRegistrationFormRef = useRef(null);
    const viewPreRegisterForm=(data)=>{
    setSelectedDrive(data)
    expandRegistrationFormRef.current?.present();
    }

  return (
    <View className="w-full h-full bg-white ">
      <View className="w-full border border-slate-200 h-16 flex-row items-center justify-center">
        <Text className="text-primary_red font-bold text-base px-3">Ordered by Time Posted</Text>
        <Ionicons name="filter" size={20} color="#F42F47" />
      </View>
        <ScrollView className="">
            <View className="w-full h-full">
              <DonationDriveBox details = {donationDriveDetails} onPress={()=>viewPreRegisterForm(donationDriveDetails)}/>
              <DonationDriveBox details = {donationDriveDetails1} onPress={()=>viewPreRegisterForm(donationDriveDetails1)}/>
              <DonationDriveBox details = {donationDriveDetails2} onPress={()=>viewPreRegisterForm(donationDriveDetails2)}/>
              <View>
                  <Text className="text-center py-10 font-bold text-gray-400">No more donation drive available.</Text>
              </View>
            </View>
        </ScrollView>
      

    <PreRegister ref={expandRegistrationFormRef} props={selectedDrive}/>
    </View>
  )
}

export default DonationDrive

const styles = StyleSheet.create({})