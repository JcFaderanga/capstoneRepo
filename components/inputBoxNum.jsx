import {
    Text,
    View,
    TextInput,
  } from 'react-native'
  import style from '../style/style';
  import {useState, useEffect} from 'react'
  import React from 'react'
  import Require from './require';
const InputBoxNum = ({value, onChangeText, borderWidth, borderColor,detail,message}) => {
  return (
    <View className= "mt-5 mx-auto ">
      <Text className="ont-bold text-base `pl-2 pb-1 ">{detail}</Text>
          <View className="mx-auto flex-row items-center bg-gray-50"
                  style={[
                          style.inputTypeText,
                          { borderColor: borderColor, borderWidth: borderWidth}
                          ]}>
                <Text className=" width-12 ml-2 mr-2 font-bold text-base color-customgray ">+63</Text>
                    <TextInput className="flex-1 p-2 text-base color-customgray bg-gray-50 rounded-[15px]"
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
                    {message ? (
                    <Require message={message} />
                ) : null}
          </View>
    </View>
    
  )
}

export default InputBoxNum
