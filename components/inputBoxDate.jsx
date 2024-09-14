import {
    Text,
    View,
    TextInput,
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text'
import React from 'react'

const InputBoxDate = ({title, keyboardType, onChangeText, borderWidth, borderColor, value, detail}) => {

    return (
    <View>
       <View className= "mt-5 mx-auto">
            <Text className="ont-bold text-base `pl-2 pb-1 ">{detail}</Text>
            <TextInputMask
                type={'datetime'}
                options={{
                  format: 'MM/DD/YYYY'
                }}
                className="w-[310px] h-[50px] relative rounded-[15px] p-4 text-base bg-gray-50 focus:bg-gray-100 focus:border-2 focus:border-gray-500"
                style={{
                    borderColor: borderColor,
                    borderWidth: borderWidth
                }}
                keyboardType={keyboardType}
                placeholder={title}
                onChangeText={(date)=>  
                    /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/.test(date)
                    ? (console.log('Valid date:', date), onChangeText(date))
                    : console.log('Invalid date format')
                }
                value={value}
            />
        </View>
    </View>
  )
}

export default InputBoxDate
