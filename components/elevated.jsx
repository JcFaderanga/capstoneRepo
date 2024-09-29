import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Elevated = ({children, width, height}) => {
  return (
    <>
       <View style={{elevation:3,width: width, height: height}} className="bg-white rounded-[10px] mx-auto my-2">
            {children}
      </View>
    </>
  )
}

export default Elevated

