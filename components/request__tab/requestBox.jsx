import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect,useState } from 'react'
import Elevated from '../elevated'
import { homeIcons  } from '../../constant'
import * as Animatable from 'react-native-animatable'
import { color } from '@rneui/themed/dist/config'
const RequestBox = ({name,description,bloodType,units,anonymous, timePosted,userId, onPress, index}) => {
    const [avatar_image, setAvatarImage] = useState(null);
    //console.log("this requestbox = ",userId)
    useEffect(() => {
        const fetchAvatar = async () => {
            const avatar = await avatar__icon(userId);
            setAvatarImage(avatar);
          }
        fetchAvatar();
      }, []);
    
  return (
    <View className="w-full px-4">

         <Elevated width={'100%'} height={"auto"} elevated={2}>
            <View className="">
                <View className="w-full h-16">
                    <View className="flex-1 h-14 pt-2">
                        <View className=" h-14 px-1 py flex-row  items-center">
                            <Image source={ require('../../assets/icon/anonymouseIcon.png')} className="w-12 h-12 rounded-full mx-3" resizeMode='contain'/>
                                <View>
                                    <Text className="text-[16px] h-7 font-bold">
                                        {(anonymous)? 'Anonymous': name} •
                                        <Text className="text-primary_red text-lg" > {bloodType}</Text>
                                    </Text>
                                    <Text className="text-[13px] leading-[15px] ">{timePosted}</Text>
                                </View>
                        </View>       
                    </View>
                </View>
            <View className="border-b border-gray-100 py-1">
                <Text className="my-2 mx-4">{(description)?description:`I need a blood donation of ${bloodType} as soon as possible. Please consider helping.`}</Text>
            </View>        
                <View className=" flex-row justify-between items-center px-4 py-2 h-16">
                    <View className=" flex-row items-center h-10">
                        <Image source={require('../../assets/icon/donated.png')} className="w-8 h-8 mr-2" resizeMode='contain'/>
                        <Text className="font-bold">{units}</Text>
                    </View>
                    <Pressable className="rounded-[20px] rounded-tr-none w-28 h-10 bg-primary_red flex justify-center items-center"
                    onPress={onPress}>
                        <Text className="text-white font-bold">Donate</Text>
                    </Pressable>
                </View>
            </View>
        </Elevated>   
    </View>
    
  )
}

export default RequestBox

const styles = StyleSheet.create({})