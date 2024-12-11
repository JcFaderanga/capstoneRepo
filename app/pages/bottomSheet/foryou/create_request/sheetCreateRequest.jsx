import { StyleSheet, Text, View,  Image } from 'react-native'
import React,{useState, useCallback, useMemo, useRef, forwardRef} from 'react'
import { BottomSheetView, BottomSheetBackdrop,BottomSheetModal  } from '@gorhom/bottom-sheet';
import BloodReminder from '../../../../../components/request__tab/foryou/blood_request/bloodReminder';
import CreateBloodRequest from '../../../../../components/request__tab/foryou/blood_request/createBloodRequest';
import * as Animatable from 'react-native-animatable'
const sheetCreateRequest = forwardRef(({user}, ref) => {
    const [isSubmitSuccess, setSubmitSuccess] = useState(false);
    const snapPoints = useMemo(() => ['70%', '80%'], []);
    const renderBackdrop = useCallback(
        (props) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
        []
    );
    const handleSubmit = () =>{ 
      setSubmitSuccess(true);
      setTimeout(() => {
        ref.current?.close();
        setSubmitSuccess(false);
       }, 1500); 
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