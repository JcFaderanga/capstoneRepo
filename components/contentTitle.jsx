import { Text, View, Image,Pressable} from 'react-native'
import React from 'react'


const ContentTitleButton = ({title, icon,backIcon, onPress, size}) => {
  return (
    <>
      <Pressable className=" flex-row items-center w-full "
              onPress={onPress}>      
              <View className="flex-row justify-between items-center">
                  <View className="w-[50px] flex justify-center items-end">
                      <Image source={icon} resizeMode='contain' style={size}/>
                  </View>
                  <Text className="font-bold text-base ml-4">
                      {title} <Text className="font-normal text-sm">sent you a Blood Request</Text>
                  </Text>
              </View>  
      </Pressable>
      <View className=" flex-1 h-[120px] px-5 items-end ">
          <View className="h-full w-[85%] border border-[#B9B9B9] rounded-[20px] rounded-tl-none">
            <View className=" h-14 px-1 flex-row items-center">
              <Image source={ require('../assets/icon/profilePic.jpg')} className="w-9 h-9 rounded-full mx-3" resizeMode='contain'/>
                  <View>
                      <Text className="text-sm font-bold h-5 ">
                          Kyrah Pangilinan •
                          <Text className="text-primaryRed text-base" > AB+</Text>
                      </Text>
                      <Text className="text-[10px] leading-3">Just now</Text>
                  </View>
            </View>  
          </View>
      </View>
    </>
  )
}

export default ContentTitleButton

