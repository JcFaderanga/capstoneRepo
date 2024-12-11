import {
    Text,
    View,
    TextInput,

} from 'react-native';
import React from 'react';

const InputBox = ({
    title, keyboardType,
    onChangeText,value,detail,
    secureTextEntry = false,
    autoCapitalize,customize = {},
    validationError
}) => {

  
    return (
        <View className="mt-5 py-1 flex items-center">
            <View className="w-full px-4">
                <Text className="text-lg pl-2 pb-1" style={customize}>
                    {detail}
                </Text>
            </View>
            <View className="flex justify-center rounded-[15px] ">
                <TextInput
                    className="
                    w-[310px] h-[56px] rounded-[15px] p-4 text-lg bg-gray-50 border border-[#D9D9D9]
                    focus:bg-gray-100 focus:border-2 focus:border-gray-100"
                    style={
                        (validationError) ? {borderColor: 'red', borderWidth: 2} : {} }
                    keyboardType={keyboardType}
                    placeholder={title}
                    onChangeText={onChangeText}
                    value={value}
                    secureTextEntry={secureTextEntry}
                    autoCapitalize={autoCapitalize}
                />
                <Text className="px-2 absolute bottom-[-20] text-primary_red">{validationError}</Text>
            </View>
        </View>
    );
};

export default InputBox;
