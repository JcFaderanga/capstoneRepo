import { StyleSheet, Text, View,FlatList } from 'react-native'
import React,{useState, useEffect, useRef} from 'react'
import DonorBox from '../find_donor/donorBox'
import SheetRequestDonation from '../../app/pages/bottomSheet/findDonor/sheetRequestDonation'
const DonorList = ({donor}) => {
const [selectedDonor, setSelectedDonor] = useState(null);

const ViewDonorBottomSheetRef = useRef(null);
  const viewDonorProfile = (data) => {
    setSelectedDonor(data);
    ViewDonorBottomSheetRef.current?.present();
  };
  return (
    <View>
       {donor?.length > 0 ? (
          <FlatList
            className="h-full w-full"
            data={donor}
            keyExtractor={(item) => item.id?.toString() || `${item.index}`}
            renderItem={({ item, index }) => (
              <DonorBox
                donor={item}
                index={index}
                onPress={() => viewDonorProfile(item)}
              />
            )}
          />
        ) : (
          <Text className="text-center font-bold py-10 text-2xl text-gray-300">
              No donor found.
          </Text>
        )}
        <SheetRequestDonation ref={ViewDonorBottomSheetRef} donor_data={selectedDonor}/>
    </View>
  )
}
export default DonorList

const styles = StyleSheet.create({})