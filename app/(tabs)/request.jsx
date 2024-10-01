import { Image, Pressable, ScrollView, StyleSheet,FlatList, Text, View } from 'react-native'
import React, { useState } from 'react'
import ReaquestHeader from '../../components/requestTabList/requestHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import RequestBox from '../../components/requestTabList/requestBox'
import RequestList from '../../components/requestTabList/requestList'
import ModalCreatebloodRequest from '../../components/Modals/modalCreatebloodRequest'
const request = () => {
  const [modalVisible, setModalVisible] = useState(false); 
  
  function createRequest(){
    console.log('clicked')
    setModalVisible(true)
  }
  return (
    <>
    <SafeAreaView>
        <View className="w-full h-full bg-white pb-28">
          <ReaquestHeader/>
          {/* FILTER BAR */}
            <View className="w-full h-[60] flex items-center justify-center">         
                <Pressable className="h-10 w-11/12 border rounded-2xl border-gray-400 flex justify-center">
                    <View className="flex-row mx-3 items-center">
                      <Image source={require('../../assets/icon/filter.png') }className="w-5 mx-2" resizeMode='contain'/>
                      <Text className="text-gray-400">
                          Filter Result: 
                          <Text className="text-primaryRed px-2"> A+ AB+</Text>
                      </Text>
                    </View>
                </Pressable>
            </View>
            <RequestList/>
          <Pressable onPress={createRequest}
          className=" h-16 w-16 rounded-full bg-primaryRed flex items-center justify-center absolute bottom-0 right-0 m-5">
            <Image source={require('../../assets/icon/createRequest.png')} className="w-6" resizeMode='contain'/>
          </Pressable>
        </View>
    </SafeAreaView>
    <ModalCreatebloodRequest
      visible={modalVisible}
      onRequestClose={()=>setModalVisible(false)}
    />
    </>
  )
}

export default request
