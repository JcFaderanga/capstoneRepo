import { Pressable, StyleSheet, Text, View,Image} from 'react-native'
import React, { useState } from 'react'
const ToggleBtn = ({}) => {
  const [isToggle, setToggle] = useState(false);
  return (
    <>
     <View >
      {<Pressable onPress={()=>setToggle(!isToggle)}>
            <Image className="w-9" 
              source={
                isToggle 
                ? require('../../../assets/icon/toggleOn.png') 
                : require('../../../assets/icon/toggleOff.png')
              } 
              resizeMode='contain'/>
        </Pressable>}
     </View>
    </>
  )
}
export default ToggleBtn