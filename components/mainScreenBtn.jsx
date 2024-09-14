import {
    Text,
    View,
    TextInput,
    Button,
    TouchableOpacity,
    Image,
    ScrollView,
    SafeAreaView,
    ScrollViewBase,
} from 'react-native'
import style from '../style/style';
import React from 'react'

const CustomButtonWithIconOnHome = ({title, imgUrl, color, imgSize, onPress}) => {
  return (
    <>
    <TouchableOpacity className="mb-4 h-28 w-28 bg-white rounded-[10px] flex justify-center items-center"
        onPress={onPress}
          style={{
              elevation: 5,
          }}>
        <View>
            <View className="flex justify-center items-center h-[70] ">
                <Image
                source={imgUrl}
                style={imgSize}
                resizeMode="contain" 
                />                
            </View> 
          </View>
          <Text className={`text-white text-base text-[#666666]`}>{title}</Text>
    </TouchableOpacity>
    </>
  )
}

export default CustomButtonWithIconOnHome
