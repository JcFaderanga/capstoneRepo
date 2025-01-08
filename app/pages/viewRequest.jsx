import { StyleSheet, Text, View, Pressable,Image } from 'react-native'
import React,{useMemo,useCallback,useRef} from 'react'
import QRCode from 'react-native-qrcode-svg';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomSheet ,{ BottomSheetView,BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useLocalSearchParams,router } from 'expo-router';
import Unavailable from '../../components/unavailable';
const ViewRequest = ({request_data}) => {

   const params = useLocalSearchParams();
   const selectedRequest = JSON.parse(params?.request_data);

   const bottomSheetRef = useRef(null);
   const snapPoints = useMemo(() => ['45%', '95%'], []);
   const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop appearsOnIndex={2} disappearsOnIndex={1} {...props} />,
      []
    );
    const handleSheetChange = (index) => {
      if (index < 0) {
        bottomSheetRef.current?.snapToIndex(1);
      }
    };
  
   const renderCustomHandle = () => (
         <View className="p-4 rounded-t-lg">
           <Text className="text-center text-xl font-bold">Your most recent request</Text>
         </View>
       );
  return (
  <SafeAreaView>
      <View className="w-full h-full bg-primary_red ">
          <GestureHandlerRootView style={{flex: 1}}> 
            <Pressable onPress={()=>router.back()} className="w-full h-16 bg-primary_red">
                      <Image
                        source={require('../../assets/icon/backArrow.png')}
                        className="w-5 absolute my-1 mx-5"
                        style={{ tintColor: 'white' }}
                        resizeMode="contain"
                      />
                    </Pressable>
              <View className="px-7">
                  <View className="w-full flex justify-center items-center bg-white rounded-3xl">
                        <Text className="text-primary_red font-bold my-6 text-xl">Your Request ID</Text>
                        <QRCode
                          value={String(selectedRequest?.blood_request_id)} 
                          size={180} 
                          color="black" 
                          backgroundColor="white" 
                        />
                        <Text className="text-center font-bold text-3xl my-6">{selectedRequest?.blood_request_id}</Text>
                    </View>
              </View>

                  <BottomSheet 
                      index={1} 
                      snapPoints={snapPoints} 
                      handleComponent={renderCustomHandle} 
                      backdropComponent={renderBackdrop}
                      onChange={handleSheetChange}
                       >
                    <BottomSheetView>
                        <View className="px-4">
                          <Unavailable/>
                        </View>
                    </BottomSheetView>
                </BottomSheet>
          </GestureHandlerRootView> 
      </View>
  </SafeAreaView>  
  )
}

export default ViewRequest

const styles = StyleSheet.create({})
