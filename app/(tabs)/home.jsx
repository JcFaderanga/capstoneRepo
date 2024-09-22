import { Image, ScrollView, Text, TouchableOpacity, View,  } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar"
import React, { useState, useEffect } from 'react'
import {homeIcons} from '../../constant'
import { router,useLocalSearchParams } from 'expo-router';
import CustomButtonWithIconOnHome from '../../components/mainScreenBtn'
import DonationDrive from '../../components/donationDrive'
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/authContext';

const Home = () => {
 const {user} = useAuth();


  return (
    <View className="w-full h-full bg-white">
        <SafeAreaView >
          {/** nav bar */}
            <View className="w-full h-[75px] flex-row justify-between items-center">
                  <View className=" ml-5 ">
                      <Text className="text-2xl font-bold text-primaryRed">Hi {user && user.first_name}!</Text>
                  </View>
                  <View className=" w-auto h-5 mr-5 flex-row">
                       {/***/}
                      <TouchableOpacity >
                            <Image className="w-[22] h-[22]"
                            tintColor={'#F42F47'}
                                    source={homeIcons.FAQs}
                                />
                        </TouchableOpacity>
                        {/** ()=> router.push('../screens/Settings')*/}
                        <TouchableOpacity >
                            <Image className="w-5 h-5 ml-4"
                                    source={homeIcons.settings}
                                />
                        </TouchableOpacity>
                  </View>
            </View>
          {/** end nav bar */}
          <View >
            <ScrollView horizontal={true}  className="flex-row ">
                <DonationDrive
                    location={'Festival Mall, Muntilupa City, 2nd floor '}
                    time={'10am - 5pm '}
                    date={'June 18, 2024'}
                    />
                <DonationDrive
                    location={'Festival Mall, Muntilupa City, 2nd floor '}
                    time={'10am - 5pm '}
                    date={'June 18, 2024'}
                    />
                    <DonationDrive
                    location={'Festival Mall, Muntilupa City, 2nd floor '}
                    time={'10am - 5pm '}
                    date={'June 18, 2024'}
                    />
                    <DonationDrive
                    location={'Festival Mall, Muntilupa City, 2nd floor '}
                    time={'10am - 5pm '}
                    date={'June 18, 2024'}
                    />
            </ScrollView>
          </View>
            <View className="w-full flex-row h-5 justify-evenly">
                <CustomButtonWithIconOnHome
                title={'Donate'}
                imgSize = {{width:48 , hight:48}}
                imgUrl={homeIcons.donate}
                />
                <CustomButtonWithIconOnHome
                title={'Find donor'}
                imgSize = {{width:46 , hight:46}}
                imgUrl={homeIcons.findDonor}
                />
                <CustomButtonWithIconOnHome
                title={'appointment'}
                imgSize = {{width:44 , hight:44}}
                imgUrl={homeIcons.appointment}
                />
            </View>
        </SafeAreaView>
      <StatusBar backgroundColor="#F42F47" style="light" />
    </View>
  )
}

export default Home
