
import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from "expo-status-bar"
import React from 'react'
import SignIn from './(auth)/sign_in'

const index = () => {
  return (
    <View>
      <SignIn/>
      <StatusBar backgroundColor="#F42F47" style="light" />
    </View>
  )
}

export default index


