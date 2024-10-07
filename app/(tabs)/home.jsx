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

const home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useAuth();

  return (
    <View className="w-full h-full bg-primaryRed">
      {/* {Modals} */}
      <ModalBloodBank
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      />
      <SafeAreaView >
        {/** nav bar */}
        <View className="w-full h-[75px] flex-row justify-between items-center">
          <View className=" ml-5 ">
            <Text className="text-2xl font-bold text-white">Hi {user && user.first_name}!</Text>
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
        <View className="w-full h-full bg-white rounded-t-[40px]">
          <View className="w-full h-full bg-white rounded-t-[40px] overflow-hidden ">
            <ImageBackground source={require('../../assets/icon/mapBg.png')} // Remote image
              className="w-full flex-1"
              resizeMode="cover"
            >
              <View className="w-full h-96 rounded-t-[40px] bg-white/60 pb-30">
                <Text className='text-primaryRed w-full text-center text-xl font-bold py-2'>Upcoming Donation Drive</Text>
                <ScrollView >

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
                  <DonationDrive
                    location={'Festival Mall, Muntilupa City, 2nd floor '}
                    time={'10am - 5pm '}
                    date={'June 18, 2024'}
                  />
                </ScrollView>
              </View>
            </ImageBackground>

          </View>
          <View style={{ elevation: 50 }} className="w-full h-[65%] bg-white/90  rounded-t-[40px] absolute bottom-0 ">
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
              />
              <CustomButtonWithIconOnHome
                title={'Bppointment'}
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
