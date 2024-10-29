import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import React from 'react'
import {homeIcons} from '../../constant'
import { router } from 'expo-router';
import NotificationMassage from '../../components/notification/notificationMessage';

const Notification = () => {
  return (
    <View className="w-full h-full bg-white">
        <SafeAreaView>
            <View className="w-full h-[75px] flex-row justify-between items-center">
                  <View className=" ml-5 ">
                      <Text className="text-2xl font-bold text-primaryRed">Inbox</Text>
                  </View>
                  <View className=" w-auto h-5 mr-5 flex-row">
                        {/** ()=> router.push('../screens/Settings')*/}
                        <TouchableOpacity>
                            <Image className="w-5 h-5 ml-4"
                                    source={homeIcons.trash}
                                />
                        </TouchableOpacity>
                  </View>
              </View>
              <ScrollView>
                <NotificationMassage
                  title={"Jc Faderanga"}
                  size= {{width: 27, hieght:25}}
                  icon = {homeIcons.mailUnseen}
                  backIcon={homeIcons.arrowNoCircle}
                />
                <NotificationMassage
                  title={"Jc Faderanga"}
                  size= {{width: 27, hieght:25}}
                  icon = {homeIcons.mailUnseen}
                  backIcon={homeIcons.arrowNoCircle}
                />
            </ScrollView>
        </SafeAreaView>     
    </View>
  )
}

export default Notification

