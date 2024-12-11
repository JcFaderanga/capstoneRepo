import {
    Text,
    View,
    TextInput,
  } from 'react-native'
  import React from 'react'
const InputBoxNum = ({value, onChangeText,detail,validationError}) => {
  return (
    <View className= "mt-5 mx-auto ">
      <Text className="ont-bold text-base `pl-2 pb-1 ">{detail}</Text>
          <View className="w-[310px] h-[56px] mx-auto flex-row items-center bg-gray-50 border border-[#D9D9D9] rounded-[15px] pl-4 text-lg"
                 style={
                  (validationError) ? {borderColor: 'red', borderWidth: 2} : {} }>
                <Text className=" width-12 ml-2 mr-2 font-bold text-xl color-primary_gray">+63</Text>
                    <TextInput className="flex-1 p-2 text-lg color-primary_gray bg-gray-50 rounded-[15px]"
                        keyboardType="numeric"
                        placeholder="Phone number"
                        onChangeText={(text)=>
                          /^\d*$/.test(text) && 
                              text.length <= 10 && 
                                (text[0] !== '0' || text.length === 0)
                                  ? 
                                    onChangeText(text)
                                  : ''
                        }
                        value={value} 
                        >  
                    </TextInput>
                    <Text className="px-2 absolute bottom-[-20] text-primary_red">{validationError}</Text>
          </View>
    </View>
    
  )
}

export default InputBoxNum
// inputTypeText: {
//   width: 310,
//   height: 56,
//   borderWidth:1,
//   borderColor: '#6B6B6B', 
//   borderRadius: 15,
//   fontSize: 16,
//   paddingLeft: 15, 
  
// },