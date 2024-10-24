import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RNPickerSelect from 'react-native-picker-select';
const dropDown = ({title, placeholder, list, onValueChange}) => {
  return (
    <View className=" w-[88%] mx-auto mt-5 ">
        <Text className="text-base pl-2 pb-1">{title}</Text>
            <View className="border border-[#EAEAEA] h-14 rounded-xl bg-gray-50">
            <RNPickerSelect 
                    onValueChange={onValueChange}
                    style={{
                      inputIOS: styles.pickerSelect, // for iOS styling
                      inputAndroid: styles.pickerSelect, // for Android styling
                  }}
                    placeholder={{
                        label: placeholder,
                        value: null, 
                        color: 'gray', 
                    }}
                    items={list}
                />     
            </View> 
    </View>
  )
}

export default dropDown

const styles = StyleSheet.create({

  pickerSelect: {
    height: 50,
    borderWidth: 1,
    borderRadius:200,

  },
});