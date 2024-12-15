import { StyleSheet, Text, View,Image, Pressable, TouchableOpacity, } from 'react-native'
import React,{useState} from 'react'
import * as Animatable from 'react-native-animatable'
import Ionicons from '@expo/vector-icons/Ionicons';
const DonorBox = ({donor, index, onPress}) => {
    const [isPressed, setIsPressed] = useState(false);

if(donor){
    var {
        id, 
        first_name,
        last_name,
        blood_type,
        anonymous_donor
    } = donor;
}

  return (
    <Animatable.View className="w-full h-[100px] flex justify-center items-center border-t-2 border-gray-200 "
         animation = 'zoomIn'
        duration={200}
        easing={'ease-in-out'}
        delay={index * 10}
        interationCount='infinity'
    >
   <TouchableOpacity
      onPress={onPress}
      onPressIn={() => setIsPressed(true)} 
      onPressOut={() => setIsPressed(false)} 
      className="h-full flex items-center justify-center"
      style={{ backgroundColor: isPressed ? '#d1d5db' : 'white', 
      }}
    >
        <View className="w-full h-14 pl-2 pr-4 flex-row justify-between items-center" >
            <View className="flex-row items-center">
                <Image source={ require('../../assets/icon/profilePic2.jpg')} className="w-12 h-12 rounded-full mx-3" resizeMode='contain'/>
                    <View>
                        <Text className="text-lg h-7 font-bold">
                            {first_name + ' ' + last_name} 
                            {/* <Text className="text-primary_red text-lg" > • {blood_type}</Text> */}
                        </Text>
                    <Text className="text-lg leading-[16px] ">Blood Type:
                        <Text className="text-primary_red font-bold"> {blood_type}</Text></Text>
                    </View>
            </View>
            <Ionicons name="arrow-forward-sharp" size={24} color="#F42F47" />
            {/* <Image source={require('../../assets/icon/arrow.png')} className="w-6" resizeMode='contain'/> */}
        </View >
     </TouchableOpacity>
    </Animatable.View>
  )
}

export default DonorBox

const styles = StyleSheet.create({})