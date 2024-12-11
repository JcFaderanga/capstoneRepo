import { StyleSheet, Text, View, Pressable, Image,ScrollView } from 'react-native'
import React,{useState, useEffect, useCallback, useMemo, useRef} from 'react'
import ThemeContainer from '../../../components/UI/themeContainer'
import RequestList from '../../../components/request__tab/requestList'
import ModalFilterRequest from '../../../components/Modals/request__tab/foryou/modalFilterRequest'
import { useAuth } from '../../../context/authContext'
import SheetCreateRequest from '../bottomSheet/foryou/create_request/sheetCreateRequest'

const Foryou = () => {
    const [modalVisible, setModalVisible] = useState(false); 
    const [modalFilterVisible, setModalFilterVisible] = useState(false); 
    const [selectedTypes, setSelectedTypes] = useState([]);//store type request to show on the list and pass data to RequestList.jsx
    const [listRefresh,setListOnRefresh] = useState(false);  
    const {user} = useAuth();

    const userData={
      id: user?.id,
      blood_type: user?.blood_type,
    }
    
    const handleSelectedBloodTypes = (types) => {
      setListOnRefresh(true);
      setSelectedTypes(types); // get data in array from ModalFilterRequest.jsx and store in selectedTypes
      setModalFilterVisible(false); // Close modal after selecting
    };

  
    const CreateBottomSheetRef = useRef(null);
    const openCreatRequestSheet = useCallback(() => {
      CreateBottomSheetRef.current?.present();
    }, []);


  return (
    <View className='bg-white h-full'>
      {/* FILTER BAR */}
        <View className="w-full h-20 flex items-center justify-center">         
            <Pressable className="h-14 w-11/12 border rounded-2xl border-gray-200 bg-white flex justify-center"  onPress={()=>setModalFilterVisible(true)}>
                <View className="flex-row mx-3 items-center">
                  <Image source={require('../../../assets/icon/filter.png') }className="w-5 mx-2" resizeMode='contain'/>
                  <Text className="text-gray-400">
                      Filter Result: 
                      <Text className="text-primaryRed px-2"> {}</Text>
                  </Text>
                </View>
            </Pressable>
        </View>
      <View className="w-full h-14 flex-row items-center px-2 ">
        <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        >
            <Text className="py-2 px-8 mx-1 border border-[#E2E2E2] rounded-3xl bg-primary_red text-white">All</Text>
            <Text className="py-2 px-8 mx-1 border border-[#E2E2E2] rounded-3xl">Compatible</Text>
            <Text className="py-2 px-8 mx-1 border border-[#E2E2E2] rounded-3xl">Anonymous</Text>
            <Text className="py-2 px-8 mx-1 border border-[#E2E2E2] rounded-3xl">Not Anonymous</Text>
            <Text className="py-2 px-8 mx-1 border border-[#E2E2E2] rounded-3xl">Urgent</Text>
     
        </ScrollView>
      </View>
        <RequestList bloodTypeFilterResult = {selectedTypes} onRefresh={listRefresh} />
        <Pressable onPress={openCreatRequestSheet}
          className=" h-16 w-16 rounded-full bg-primary_red flex items-center justify-center absolute bottom-0 right-0 m-5 border border-white">
            <Image source={require('../../../assets/icon/droplet.png')} className="w-6" resizeMode='contain'/>
        </Pressable>

        <SheetCreateRequest ref={CreateBottomSheetRef} user={userData}/>
   
          <ModalFilterRequest
            visible={modalFilterVisible}
            onRequestClose={()=>setModalFilterVisible(false)}
            selectedBloodType={handleSelectedBloodTypes}
          />
    </View>
  )
}

export default Foryou

const styles = StyleSheet.create({})