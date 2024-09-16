import { Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar"
import React from 'react'
import {homeIcons} from '../../constant'
import { Link, router } from 'expo-router';
import CustomButtonWithIconOnHome from '../../components/mainScreenBtn'
const home = () => {
  return (
    <View className="w-full h-full bg-white">
        <SafeAreaView >
          {/** nav bar */}
            <View className="w-full h-[75px] flex-row justify-between items-center">
                  <View className=" ml-5 ">
                      <Text className="text-2xl font-bold text-primaryRed">Hello Jc!</Text>
                  </View>
                  <View className=" w-auto h-5 mr-5 flex-row">
                       {/***/}
                      <TouchableOpacity onPress={()=> router.push('../screens/FAQs')}>
                            <Image className="w-[22] h-[22]"
                            tintColor={'#F42F47'}
                                    source={homeIcons.FAQs}
                                />
                        </TouchableOpacity>
                        {/** ()=> router.push('../screens/Settings')*/}
                        <TouchableOpacity onPress={ ()=> router.push('../screens/Settings')}>
                            <Image className="w-5 h-5 ml-4"
                                    source={homeIcons.settings}
                                />
                        </TouchableOpacity>
                  </View>
            </View>
          {/** end nav bar */}
            <View className="w-full flex-row h-5 justify-evenly">
                <CustomButtonWithIconOnHome
                title={'Donate'}
                imgSize = {{width:50 , hight:50}}
                imgUrl={homeIcons.donate}
                />
                <CustomButtonWithIconOnHome
                title={'Find donor'}
                imgSize = {{width:48 , hight:48}}
                imgUrl={homeIcons.findDonor}
                />
                <CustomButtonWithIconOnHome
                title={'appointment'}
                imgSize = {{width:46 , hight:46}}
                imgUrl={homeIcons.appointment}
                />

            </View>
        </SafeAreaView>
      <StatusBar backgroundColor="#F42F47" style="light" />
    </View>
  )
}

export default home
