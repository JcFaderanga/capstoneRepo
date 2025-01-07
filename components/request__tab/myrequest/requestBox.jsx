import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Elevated from '../../elevated'
import QRCode from 'react-native-qrcode-svg';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const MostRecentRequest = ({recentRequest, onPress}) => {


  const convertTimestampToDate = (timestamp) => {
    const date = new Date(timestamp); 
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
  
    return `${month}/${day}/${year}`;
  };

  const color = recentRequest?.approve ? 'green' : '#f97316';
    return (
        <View>

                <View className="px-6 pt-10 pb-9 my-1 bg-white">
                    <View className="flex-row">
                        <QRCode value={JSON.stringify(recentRequest?.blood_request_id)} size={90} color="black" backgroundColor="white"/>
                          <View className="px-3">
                              <Text className="font-bold text-lg">Requested: <Text className="font-normal">{convertTimestampToDate(recentRequest?.created_at)}</Text></Text>
                              <Text className="font-bold text-lg">Units: <Text className="font-normal">{recentRequest?.units}</Text></Text>
                              <Text className="font-bold text-lg text-primary_red"> {recentRequest?.urgent ? 'Urgent': ''}</Text>
                          </View>
                    </View>
                    <View className=" border border-white mt-2">
                        <View className="flex-row justify-between items-center">
                            <View>
                                <Text className="font-bold text-[16px]">Status</Text>
                                <Text className="font-bold text-[16px] " style={{color: color}}>
                                  {recentRequest?.approve ? 'Approve' : 'Under review'}
                                </Text>
                            </View>
                            <Pressable className="flex-row w-32 h-12 justify-center items-center bg-slate-100 rounded-full" 
                             onPress={onPress}>
                                <Text className="text-xl text-[#5B5B5B] pb-1">View</Text>
                                <MaterialIcons name="keyboard-arrow-right" size={30} color="#5B5B5B" className="mr-[-12] "/>
                            </Pressable>
                        </View>
                    </View>
                </View>
            
        </View>
    )
}

export default MostRecentRequest

const styles = StyleSheet.create({})