import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SignUpHeader = ({text}) => {
  return (
    <View>
      <View className="w-full h-[100] flex items-center flex justify-end">
            <Text className="text-customgray text-xl font-interRegularBold">{text}</Text>
        </View>
    </View>
  )
}

export default SignUpHeader

