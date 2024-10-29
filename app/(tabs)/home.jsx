import { Image, ScrollView, Text, TouchableOpacity, View, ImageBackground } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar"
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { homeIcons } from '../../constant'
import CustomButtonWithIconOnHome from '../../components/UI/button/mainScreenBtn'
import DonationDrive from '../../components/donationDrive'
import { useAuth } from '../../context/authContext';
import ModalBloodBank from '../../components/Modals/modalBloodBank';
import RequestBox from '../../components/requestTabList/requestBox';
const home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useAuth();

  return (
    <View className="w-full h-full bg-gray-100">
      {/* {Modals} */}
      <ModalBloodBank
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      />
      <SafeAreaView >
        {/** nav bar */}
        <View style={{elevation: 10}} className="w-full h-[75px] flex-row justify-between items-center bg-primaryRed rounded-b-[40]">
          <View className=" ml-5 ">
            <Text className="text-2xl font-bold text-white">Hi {user && user?.first_name}!</Text>
          </View>
          <View className=" w-auto h-5 mr-5 flex-row">
            {/** onPress={()=> router.push('../screens/FAQs')} */}
            <TouchableOpacity onPress={() => router.push('../screens/FAQs')}>
              <Image className="w-[22] h-[22]"
                tintColor={'#ffffff'}
                source={homeIcons.FAQs}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/** end nav bar */}
        <View className="w-full h-full">
              <View className="flex-1 justify-center ">
                {/* <Text className='text-primaryRed w-full text-center text-xl font-bold py-2'>Upcoming Donation Drive</Text> */}
                    <DonationDrive
                    onPress={()=>router.push('../screens/donationDrive')}
                    />
 
              </View>

          <View style={{ elevation: 15 }} className="w-full h-[65%] bg-white rounded-t-[40px]  bottom-0 flex">
            <View className="w-full flex-wrap flex-row justify-center items-center pt-5">
              <CustomButtonWithIconOnHome
                title={'Donate'}
                imgSize={{ width: 48, hight: 48 }}
                imgUrl={homeIcons.donate}
              />
              <CustomButtonWithIconOnHome
                title={'Find donor'}
                imgSize={{ width: 46, hight: 46 }}
                imgUrl={homeIcons.findDonor}
                onPress={()=>router.push('../../screens/findDonor')}
              />
              <CustomButtonWithIconOnHome
                title={'Appointment'}
                imgSize={{ width: 44, hight: 44 }}
                imgUrl={homeIcons.appointment}
              />
              <CustomButtonWithIconOnHome
                title={'Blood Bank'}
                imgSize={{ width: 40, hight: 40 }}
                imgUrl={homeIcons.mediumStock}
                onPress={() => setModalVisible(true)}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
      <StatusBar backgroundColor="#F42F47" style="light" />
    </View>
  )
}

export default home
