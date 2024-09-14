import {
    Text,
    View,
    TextInput,
    Button,
    TouchableOpacity,
    Image,
    ScrollView,
    SafeAreaView,
} from 'react-native'
import style from '../style/style'
import React from 'react'


const CustomBtn = ({title,onPress}) => {
  return (
    <View>
        <View className="mx-auto mt-5 mb-5">{/**button */}
            <TouchableOpacity style={style.button} onPress={onPress}>
                <Text className="text-white text-lg font-bold">{title}</Text>
            </TouchableOpacity> 
        </View>
    </View>
  )
}

export default CustomBtn
