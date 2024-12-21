import { StyleSheet, Text, View, Image } from 'react-native'
import React,{useState, useCallback, useMemo, useRef, forwardRef} from 'react'
import { BottomSheetView, BottomSheetBackdrop,BottomSheetModal  } from '@gorhom/bottom-sheet';

const sheetRequestDonation =  forwardRef(({donor_data}, ref) => {
     const snapPoints = useMemo(() => ['50%','80%'], []);
        const renderBackdrop = useCallback(
            (props) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
            []
        );

    const renderCustomHandle = () => (
        <View className="h-14 w-full px-4 rounded-t-xl flex-row items-center justify-center ">
            <Image 
            source={require('../../../../assets/icon/profilePic2.jpg')} 
            className="w-44 h-44 rounded-full border-[10px] border-primary_red" 
            resizeMode='contain'/>
        </View>
      );
      
  return (
    <BottomSheetModal 
     ref={ref}
     snapPoints={snapPoints}
     handleComponent={renderCustomHandle}
     backdropComponent={renderBackdrop}>
        <BottomSheetView className="w-full h-full ">
                <Text>{donor_data?.id}</Text>
                <Text>VIEW</Text>
                <Text>VIEW</Text>
                <Text>VIEW</Text>
                <Text>VIEW</Text>
        </BottomSheetView>
    </BottomSheetModal> 
  )
})

export default sheetRequestDonation

const styles = StyleSheet.create({})