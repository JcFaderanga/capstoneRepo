import {
    Text,
    View,
    TextInput,
} from 'react-native';
import { useState } from 'react';
import React from 'react';

const InputBox = ({ title, keyboardType, onChangeText, borderWidth, borderColor, value, detail, edit }) => {
    const [isDisabled, setIsDisabled] = useState(false);
    return (
        <>
         <View className= "mt-5 mx-auto">
            <Text className="ont-bold text-base `pl-2 pb-1 ">{detail}</Text>
            <TextInput
                className="w-[310px] h-[50px] rounded-[15px] p-4 text-base bg-gray-50 focus:bg-gray-100 focus:border-2 focus:border-gray-500"
                style={{
                    borderColor: borderColor,
                    borderWidth: borderWidth
                }}
                keyboardType={keyboardType}
                placeholder={title}
                onChangeText={onChangeText}
                value={value}
                editable={edit}
            />
        </View>
        </>
    );
}

export default InputBox;
