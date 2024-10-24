import {
    Text,
    View,
    TextInput,
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text'
import React from 'react'
import Require from '../../require';
const InputBoxDate = ({title, keyboardType, onChangeText, borderWidth, borderColor, value, detail,message}) => {

    return (
    <View>
       <View className= "mt-5 mx-auto">
            <Text className="ont-bold text-base `pl-2 pb-1 ">{detail}</Text>
            <View className="flex justify-center">
                <TextInputMask
                    type={'datetime'}
                    options={{
                    format: 'MM/DD/YYYY'
                    }}
                    className="w-[310px] h-[56px]  rounded-[15px] p-4 text-base bg-gray-50 focus:bg-gray-100 focus:border-2 focus:border-gray-500"
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
            {message ? (
                    <Require message={message} />
                ) : null}
                <Text className="px-2 absolute bottom-[-20] text-primaryRed">{message.message}</Text>
            </View>

        </View>
    </View>
  )
}

export default InputBoxDate
