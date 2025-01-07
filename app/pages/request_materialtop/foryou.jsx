import { StyleSheet, Text, View, Pressable, Image,ScrollView } from 'react-native'
import React,{useState, useEffect, useCallback, useMemo, useRef} from 'react'
import ThemeContainer from '../../../components/UI/themeContainer'
import RequestList from '../../../components/request__tab/requestList'
import ModalFilterRequest from '../../../components/Modals/request__tab/foryou/modalFilterRequest'
import { useAuth } from '../../../context/authContext'
import SheetCreateRequest from '../bottomSheet/foryou/create_request/sheetCreateRequest'
import RNPickerSelect from 'react-native-picker-select';
const Foryou = () => {
    const [modalVisible, setModalVisible] = useState(false); 
    const [modalFilterVisible, setModalFilterVisible] = useState(false); 
    const [selectedTypes, setSelectedTypes] = useState([]);//store type request to show on the list and pass data to RequestList.jsx
    const [listRefresh,setListOnRefresh] = useState(false);  
    const [filter, setFilter] = useState(null)
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
        <View className="w-full h-20 flex items-center justify-center px-3">         
            <Pressable className="h-16 w-full border rounded-2xl border-gray-200 bg-white flex justify-center"  onPress={()=>setModalFilterVisible(true)}>
                <View className="flex-row mx-3 items-center">
                  <Image source={require('../../../assets/icon/filter.png') }className="w-5 mx-2" resizeMode='contain'/>
                  <Text className="text-gray-400">
                      Filter Result: 
                      <Text className="text-primaryRed px-2 text-primary_red"> {selectedTypes.join(', ') || 'All Type'}</Text>
                  </Text>
                </View>
            </Pressable>
        </View>
        <View className="w-full flex-row border border-transparent mb-4">
          <DropDown
            placeholder={'Type'}
            list = {[{ label: 'All', value: 'All' },{ label: 'Compatible', value: 'Complatible' },]}
            onValueChange={value => setFilter(value)}
          />
          <DropDown
            placeholder={'Recipient'}
            list = {[
                    { label: 'All', value: 'All'},
                    { label: 'Anonymouse', value: 'Anonymouse' },
                    { label: 'Not Anonymouse', value: 'Not Anonymouse'},
                    ]}
            onValueChange={value => setFilter(value)}
          />
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

export default Foryou;

const DropDown = ({title, placeholder, list, onValueChange}) => {
  return (
    <View className="flex-1 px-3 h-14">
        {/* <Text className="text-base pl-2 pb-1 ">{title}</Text> */}
            <View className="border border-[#EAEAEA] rounded-xl bg-white">
            <RNPickerSelect 
                    onValueChange={onValueChange}
                    style={{
                      inputIOS: styles.pickerSelect, // for iOS styling
                      inputAndroid: styles.pickerSelect, // for Android styling
                  }}
                    placeholder={{
                        label: placeholder,
                        value: null, 
                        color: 'gray', 
                    }}
                    items={list}
                />     
            </View> 
    </View>
  )
}

const styles = StyleSheet.create({

  pickerSelect: {
    borderWidth: 1,
    borderRadius:300,

  },
});