import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Elevated = ({children, width, height, elevated}) => {
  return (
    <>
       <View style={{elevation: elevated ? elevated : 3,width: width, height: height}} className="bg-white rounded-[10px] mx-auto my-2">
            {children}
      </View>
    </>
  )
}

export default Elevated

