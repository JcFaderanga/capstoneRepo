import { Image, ScrollView, Text, TouchableOpacity, View,StyleSheet } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar"
import React from 'react'
import {homeIcons} from '../../constant'
import { Link, router } from 'expo-router';
import ContentTitleButton from '../../components/contentTitle';
import FAQsIcons from '../../constant';
const Profile = () => {
  return (
    <View className="w-full h-full bg-white">
        <SafeAreaView>
          <ScrollView>
            <View className="w-full h-[75px] flex-row justify-between items-center ">
                  <View className=" ml-5 "></View>
                  <View className=" w-auto h-5 mr-5 flex-row" >
                        {/** ()=> router.push('../screens/Settings')*/}
                        <TouchableOpacity>
                            <Image className="w-7 h-7 ml-4"
                                    source={homeIcons.edit}
                                />
                        </TouchableOpacity>
                  </View>
              </View>
            {/* items here */}
            <View className="w-full h-[130px] flex-row items-center justify-between">
                <View className=" ml-6" style={{ elevation: 5, borderRadius: 500,}}>
                    <Image source={require('../../assets/icon/profile.jpg')} 
                              style={styles.profileImage}
                              className="bg-white border"
                              resizeMethod='retain'/>
                </View>  
                <View className="float-left  h-full flex-1 ml-5 justify-center">
                  <Text className="float-left text-2xl font-bold">JC Faderanga</Text>
                  <Text className="float-left text-base font-bold text-primaryRed">ID: 813571833</Text>
                </View>
            </View>
            </ScrollView>
        </SafeAreaView>     
    </View>
  )
}
const styles = StyleSheet.create({
  profileImage: {
    width: 120,
    height: 120,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 500,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 20, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 10, // For a rounded image
  },
});
export default Profile

