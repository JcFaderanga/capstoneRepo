import { Image, Pressable, ScrollView, StyleSheet,FlatList, Text, View } from 'react-native'
import React, { useState } from 'react'
import ReaquestHeader from '../../../components/requestTabList/requestHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import RequestBox from '../../../components/requestTabList/requestBox'
import RequestList from '../../../components/requestTabList/requestList'
import ModalCreateBloodRequest from '../../../components/Modals/modalCreatebloodRequest'
import ModalFilterRequest from '../../../components/Modals/modalFilterRequest'
const ForYou = () => {
  const [modalVisible, setModalVisible] = useState(false); 
  const [modalFilterVisible, setModalFilterVisible] = useState(false); 
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [listRefresh,setListOnRefresh] = useState(false);
  function createRequest(){
    console.log('clicked')
    setModalVisible(true)
  }
  const handleSelectedBloodTypes = (types) => {
    setListOnRefresh(true);
    setSelectedTypes(types);
    setModalFilterVisible(false); // Close modal after selecting
  };
  return (
    <>

        <View className="w-full h-full bg-gray-50 pb-[17%]">
          {/* FILTER BAR */}
            <View className="w-full h-[60] flex items-center justify-center rounded-b-[20px] ">         
                <Pressable className="h-10 w-11/12 border rounded-2xl border-gray-400 bg-white flex justify-center" onPress={()=>setModalFilterVisible(true)}>
                    <View className="flex-row mx-3 items-center">
                      <Image source={require('../../../assets/icon/filter.png') }className="w-5 mx-2" resizeMode='contain'/>
                      <Text className="text-gray-400">
                          Filter Result: 
                          <Text className="text-primaryRed px-2"> {selectedTypes.join(', ') || 'All Type'}</Text>
                      </Text>
                    </View>
                </Pressable>
            </View>
            <RequestList bloodTypeFilterResult = {selectedTypes} onRefresh={listRefresh}/>
          <Pressable onPress={createRequest}
          className=" h-16 w-16 rounded-full bg-primaryRed flex items-center justify-center absolute bottom-0 right-0 m-5 border border-white">
            <Image source={require('../../../assets/icon/createRequest.png')} className="w-6" resizeMode='contain'/>
          </Pressable>
        </View>
    <ModalCreateBloodRequest
      visible={modalVisible}
      onRequestClose={()=>setModalVisible(false)}
    />
    <ModalFilterRequest
      visible={modalFilterVisible}
      onRequestClose={()=>setModalFilterVisible(false)}
      selectedBloodType={handleSelectedBloodTypes}
    />
    </>
  )
}

export default ForYou
