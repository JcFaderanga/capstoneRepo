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
import style from '../../../style/style';
import React from 'react'

const CustomButtonWithIconOnHome = ({title, imgUrl, color, imgSize, onPress}) => {
  return (
    <>
    <TouchableOpacity className="mb-4 h-[100] w-[100] m-2 bg-white rounded-[10px] flex justify-center items-center"
        onPress={onPress}
          style={{
              elevation: 3,
          }}>
        <View>
            <View className="flex justify-center items-center h-[65] ">
                <Image
                source={imgUrl}
                style={imgSize}
                resizeMode="contain" 
                />                
            </View> 
          </View>
          <Text className={` text-sm text-[#666666]`}>{title}</Text>
    </TouchableOpacity>
    </>
  )
}

export default CustomButtonWithIconOnHome