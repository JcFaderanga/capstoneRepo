import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SignUpHeader = ({text}) => {
  return (
    <View>
      <View className="w-full h-[100] items-center flex justify-end">
            <Text className="text-primary_gray text-xl font-interRegularBold">{text}</Text>
        </View>
    </View>
  )
}

export default SignUpHeader

