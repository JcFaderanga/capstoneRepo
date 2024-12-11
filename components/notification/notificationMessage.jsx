import { Text, View, Image,Pressable} from 'react-native'
import React from 'react'
import { homeIcons } from '../../constant'


const NotificationMassage = ({title, icon,backIcon, onPress, size}) => {
  return (
    <View className=" pb-5">
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
      <View className=" w-full h-[120px] px-5 items-end">
          <View className="h-full w-[85%] border border-[#cbcbcb] rounded-[20px] rounded-tl-none bg-white">
            <View className=" ">
              <View>
                  <View  className=" h-12 px-1 flex-row items-center">
                  <Image source={ homeIcons.profile} className="w-9 h-9 rounded-full mx-3" resizeMode='contain'/>
                      <View>
                      <Text className="text-sm font-bold h-5 ">
                              Kyrah Pangilinan •
                              <Text className="text-primaryRed text-base" > AB+</Text>
                          </Text>
                          <Text className="text-[10px] leading-3">Just now</Text>
                      </View>
                  </View>
              </View>
                  <View className=" flex-row justify-between items-center px-4 py-2 h-16">
                    <View className=" flex-row items-center h-10">
                        <Image source={require('../../assets/icon/donated.png')} className="w-8 h-8 mr-2" resizeMode='contain'/>
                        <Text className="font-bold">{"2 units"}</Text>
                    </View>
                    <Pressable className="rounded-[20px] rounded-tr-none w-28 h-9 bg-primaryRed flex justify-center items-center">
                        <Text className="text-white font-bold">Donate</Text>
                    </Pressable>
                </View>
            </View>  
          </View>
      </View>
    </View>
  )
}

export default NotificationMassage

