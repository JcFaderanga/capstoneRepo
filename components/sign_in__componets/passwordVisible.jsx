import { StyleSheet, Text, View, Pressable,Image } from 'react-native'
import React from 'react'

const PasswordVisible = ({onPress, isVisible}) => {
  return (
    <View>
        <Pressable className=" right-0 mx-4 top-[-46px] absolute"
            onPress={onPress}>
                {isVisible ?
                    <Image source={require('../../assets/icon/hide.png')}
                        className="w-6 mt-[-3]" resizeMode='contain'/>
                    :
                    <Image source={ require('../../assets/icon/show.png')}
                        className="w-6" resizeMode='contain'  />  
                }  
        </Pressable>
    </View>
  )
}

export default PasswordVisible

