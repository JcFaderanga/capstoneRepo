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
import style from '../../../style/style';
import React from 'react'

const CustomButtonWithIcon = ({title, url, iconStyle, btnBg, color, onPress}) => {
  return (
    <View>
      <TouchableOpacity className="mb-4" style={[style.button, btnBg]} onPress={onPress}>
                    <View className="flex-row borde">
                        <Image className="mr-4 border" style={iconStyle}
                        source={url}
                        />
                    <Text className={`text-white text-base font-bold ${color}`}>{title}</Text>
                    </View>
        </TouchableOpacity>
    </View>
  )
}

export default CustomButtonWithIcon
