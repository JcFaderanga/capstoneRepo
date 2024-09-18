import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import ToggleButton from '../../components/toggleBtn'
import ContentTitleButton from '../../components/contentTitle'
import { FAQsIcons } from '../../constant'
import { router } from 'expo-router'

const Settings = () => {
  return (
    <View className="w-full h-full bg-white">
      <SafeAreaView>
      <Text>Settings</Text>
      <TouchableOpacity onPress={()=> router.push('.././')}>
         <Text className=" border bg-gray-500 text-white">BACK</Text>
      </TouchableOpacity>
      <ContentTitleButton
          title={"Notifications"}
          size= {{width: 27, hieght:25}}
          icon = {FAQsIcons.aboutApp}
          onPress={() => router.push('./FAQsPages/aboutApp')}
       />
       <ContentTitleButton
          title={"Notifications"}
          size= {{width: 27, hieght:25}}
          icon = {FAQsIcons.aboutApp}
          onPress={() => router.push('./FAQsPages/aboutApp')}
       />
       <ContentTitleButton
          title={"Logout"}
          size= {{width: 27, hieght:25}}
          icon = {FAQsIcons.aboutApp}
          onPress={() => router.push('.././')}
       />
      </SafeAreaView>
    </View>
  )
}

export default Settings

