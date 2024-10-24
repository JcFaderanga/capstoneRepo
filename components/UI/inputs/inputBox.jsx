import {
    Text,
    View,
    TextInput,
} from 'react-native';
import React from 'react';
import Require from '../../require';

const InputBox = ({
    title,
    keyboardType,
    onChangeText,
    borderWidth,
    borderColor,
    value,
    detail,
    edit = true,
    secureTextEntry = false,
    autoCapitalize,
    customize = {},
    message = '',
}) => {
    return (
        <View className="mt-5 mx-auto">
            <Text className="text-base pl-2 pb-1" style={customize}>
                {detail}
            </Text>
            <View className="flex justify-center">
                <TextInput
                    className="w-[310px] h-[56px] rounded-[15px] p-4 text-base bg-gray-50 focus:bg-gray-100 focus:border-2 focus:border-gray-500"
                    style={{
                        borderColor: borderColor,
                        borderWidth: borderWidth,
                    }}
                    keyboardType={keyboardType}
                    placeholder={title}
                    onChangeText={onChangeText}
                    value={value}
                    editable={edit}
                    secureTextEntry={secureTextEntry}
                    autoCapitalize={autoCapitalize}
                />
                {message ? (
                    <Require message={message} />
                ) : null}
                <Text className="px-2 absolute bottom-[-20] text-primaryRed">{message.message}</Text>
            </View>
        </View>
    );
};

export default InputBox;
