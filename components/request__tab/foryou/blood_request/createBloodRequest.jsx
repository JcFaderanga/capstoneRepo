import { StyleSheet, Text, View,Pressable, Image } from 'react-native'
import React,{useState} from 'react'
import ToggleButton from '../../../UI/button/toggleBtn';
import ThemeButton from '../../../UI/button/themeButton';
import { createPublicRequest } from '../../../../services/requestServices';
const createBloodRequest = ({onPress, user}) => {
  const [requestUnits, setRequestUnits] = useState(1);
  const [isRequestAnonymous, setRequestAnonymous] = useState(false);

  const handleSave = () => {
    const { id, blood_type } = user;
    let request = {
      user_id: id,
      blood_type: blood_type,
      units: requestUnits,
      anonymous: isRequestAnonymous,
      public_request: true,
    };
    createPublicRequest(request);
  
    if (onPress) {
      onPress();
    }
  };

  return (
    <View className=" flex justify-center my-5">
      <View className=" border border-[#DCDCDC] h-40 px-4 rounded-2xl py-4">
        <Text className="text-lg py-1">How many unit do you need?</Text>
        <View className="w-full h-14 border border-[#DCDCDC] flex-row items-center justify-between px-4 rounded-xl">
            <View>
               <Text className="text-xl font-bold text-customgray">{requestUnits} <Text className="font-normal">unit(s)</Text></Text>
            </View>
            <View className=" flex-row items-center  ">
              <Pressable onPress={()=>requestUnits > 1 && setRequestUnits(requestUnits -1)}  className="  p-2">
                  <Image source={require('../../../../assets/icon/minus.png')} className="w-5" resizeMode="contain"/>
              </Pressable> 
              <Pressable onPress={()=>setRequestUnits(requestUnits +1)} className="px-2">
                <Image source={require('../../../../assets/icon/add.png')}  className="w-5" resizeMode="contain"/>
              </Pressable>
            </View>
        </View>
      </View>

      <View className="w-full h-16 border border-[#DCDCDC] flex-row items-center justify-between rounded-xl my-5">
        <View className="flex-1 flex-row justify-between items-center px-8 h-20">
            <View className="flex-row items-center gap-3">
              <Image source={require('../../../../assets/icon/lock.png')} className="w-7" resizeMode='contain' />
              <Text className="font-bold text-[15px]">Anonymous Request</Text>
            </View>
            <ToggleButton
              onPress={(isToggled) => setRequestAnonymous(isToggled)}
              AlertTitle={'Anonymous Request'}
              AlterDescription={'Turning on Anonymous Request will hide your name and profile from the feed.'}
            />
          </View>
        </View>

        <ThemeButton title={'Post Request'} onPress={handleSave} />

    </View>
  )
}

export default createBloodRequest

const styles = StyleSheet.create({})