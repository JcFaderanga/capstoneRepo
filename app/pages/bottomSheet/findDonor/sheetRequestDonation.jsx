import { StyleSheet, Text, View } from 'react-native'
import React,{useState, useCallback, useMemo, useRef, forwardRef} from 'react'
import { BottomSheetView, BottomSheetBackdrop,BottomSheetModal  } from '@gorhom/bottom-sheet';

const sheetRequestDonation =  forwardRef(({donor_data}, ref) => {
     const snapPoints = useMemo(() => ['90%'], []);
        const renderBackdrop = useCallback(
            (props) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
            []
        );
  return (
    <BottomSheetModal 
     ref={ref}
     snapPoints={snapPoints}
    //  handleComponent={renderCustomHandle} 
     backdropComponent={renderBackdrop}>
        <BottomSheetView>
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