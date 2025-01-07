import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Elevated = ({children, width, height, elevated, radius = 15}) => {
  return (
    <>
       <View style={{elevation: elevated ? elevated : 3,width: width, height: height, borderRadius:radius}} className="bg-white mx-auto my-2">
            {children}
      </View>
    </>
  )
}

export default Elevated

