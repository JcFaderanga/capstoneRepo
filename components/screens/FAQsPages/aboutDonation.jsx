import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ContentTitleButton from '../../../components/contentTitle'
import { FAQsIcons } from '../../../constant'
import { router } from 'expo-router'

const aboutDonation = () => {
  return (
    <View className="bg-white h-full">
      <ContentTitleButton
          title={"Why Donate Blood?"}
          size= {{width: 28, hieght:25}}
          icon = {FAQsIcons.whyDonate}
          backIcon={FAQsIcons.arrow}
          onPress={() => router.push('')}
       />
       <ContentTitleButton
          title={"Am I Eligible?"}
          size= {{width: 27, hieght:25}}
          icon = {FAQsIcons.eligible}
          backIcon={FAQsIcons.arrow}
          onPress={() => router.push('')}
       />
       <ContentTitleButton
          title={"Donation Process"}
          size= {{width: 27, hieght:25}}
          icon = {FAQsIcons.donationProcess}
          backIcon={FAQsIcons.arrow}
          onPress={() => router.push('')}
       />
    </View>
  )
}

export default aboutDonation

const styles = StyleSheet.create({})