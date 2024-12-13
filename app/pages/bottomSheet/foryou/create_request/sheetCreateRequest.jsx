import { StyleSheet, Text, View,  Image } from 'react-native'
import React,{useState, useCallback, useMemo, useRef, forwardRef} from 'react'
import { BottomSheetView, BottomSheetBackdrop,BottomSheetModal  } from '@gorhom/bottom-sheet';
import BloodReminder from '../../../../../components/request__tab/foryou/blood_request/bloodReminder';
import CreateBloodRequest from '../../../../../components/request__tab/foryou/blood_request/createBloodRequest';
import * as Animatable from 'react-native-animatable'
import { useRouter } from 'expo-router';
import { fetchRecentRequest } from '../../../../../services/requestServices';
import MyRequest from './createRequest__modal/MyRequest';

const sheetCreateRequest = forwardRef(({user}, ref) => {
    const [isSubmitSuccess, setSubmitSuccess] = useState(false);
    const [modalMyRequest, setModalMyRequest] = useState(false);
    const [recentRequestData, setRecentRequestData] = useState(null);

    const snapPoints = useMemo(() => ['90%', '95%'], []);
    const renderBackdrop = useCallback(
        (props) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
        []
    );
    const handleSubmit = (requestData) =>{ 


      setRecentRequestData(requestData)
      setSubmitSuccess(true);
      setTimeout(() => {
        ref.current?.close();
        setSubmitSuccess(false);
        setModalMyRequest(true);

        }, 1500); 
     }

    if(modalMyRequest){
      return(
        <MyRequest 
        visible={modalMyRequest}
        recentRequestData = {recentRequestData}
        onRequestClose={() => setModalMyRequest(false)}/>
      )
    }
    const renderCustomHandle = () => (
      <View className="p-4 rounded-t-lg">
        <Text className="text-center text-xl font-bold">Blood Request</Text>
      </View>
    );
  return (
    <BottomSheetModal 
     ref={ref}
     snapPoints={snapPoints} 
     handleComponent={renderCustomHandle} 
     backdropComponent={renderBackdrop}>
        <BottomSheetView>

        {isSubmitSuccess?(
            <Animatable.View
            animation = 'bounceIn'
            duration={500}
            easing={'ease-in'}
            interationCount='infinity'
            className="my-14 justify-center items-center ">
                <Image source={require('../../../../../assets/icon/check.png')} resizeMode='contain' className=" h-[120px]"/>  
                <View>
                <Text className="font-bold text-xl text-[#4CAF50]">Request Success</Text>
                </View>
            </Animatable.View>
        ):( 
        <View className="px-4">
            <BloodReminder/>
            <CreateBloodRequest onPress={handleSubmit} user={user}/>
        </View>
        )}
        </BottomSheetView>
    </BottomSheetModal>

  )
})

export default sheetCreateRequest

const styles = StyleSheet.create({})