import { Image, Pressable, StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/authContext';
import useFetchDonors from '../../hooks/find_donor/useFetchDonors';
import DonorBox from '../../components/find_donor/donorBox';
import SheetRequestDonation from '../pages/bottomSheet/findDonor/sheetRequestDonation';
import ThemeContainer from '../../components/UI/themeContainer';
import { ShowCompatibility } from '../../hooks/blood_validation/useBloodCopatibilty';
import RNPickerSelect from 'react-native-picker-select';

const FindDonor = () => {
  const [viewDonor, setViewDonor] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [compatibility, setCompatibility] = useState(null);
  const [typeFilter, setTypeFilter] = useState(null);
  const [anonymousFilter, setAnonymousFilter] = useState(null);
console.log('selected filter', typeFilter, anonymousFilter)
  const { user } = useAuth();
  const { donor, loading, error, fetchDonors } = useFetchDonors();
  const ViewDonorBottomSheetRef = useRef(null);

  useEffect(() => {
    if (!user) return;
    const bloodCompatibility = ShowCompatibility(user?.blood_type);
    setCompatibility(bloodCompatibility);
  }, [user]);

  useEffect(() => {
    if (compatibility?.canReceiveFrom?.length > 0) {
      const {canReceiveFrom} =compatibility;
      fetchDonors({canReceiveFrom,typeFilter,anonymousFilter});
    }
  }, [compatibility,typeFilter,anonymousFilter ]);



  const viewDonorProfile = (data) => {
    setSelectedDonor(data);
    ViewDonorBottomSheetRef.current?.present();
  };

  if (!user || loading) {
    return (
      <ThemeContainer>
        <View className="flex-1 items-center justify-center bg-white">
         <Image 
            source={require("../../assets/icon/loading1.gif")}  
            style={{ width: 30, height: 30, tintColor:"#F42F47" }}              
          />
        </View>
      </ThemeContainer>
    );
  }

  return (
    <ThemeContainer>
      <View className="h-full w-full bg-white">
        <View className="w-full flex-row border border-transparent my-4">
          <DropDown
            placeholder="Type"
            list={[
              { label: 'All', value: 'All' },
              { label: 'Compatible', value: 'Compatible' },
            ]}
            onValueChange={(value) => setTypeFilter(value)}
          />
          <DropDown
            placeholder="Donor"
            list={[
              { label: 'All', value: 'All' },
              { label: 'Anonymous', value: 'Anonymous' },
              { label: 'Not Anonymous', value: 'Not Anonymous' },
            ]}
            onValueChange={(value) => setAnonymousFilter(value)}
          />
        </View>

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
          <Text>No donor found.</Text>
        )}

        <SheetRequestDonation ref={ViewDonorBottomSheetRef} donor_data={selectedDonor}
        />
      </View>
    </ThemeContainer>
  );
};

export default FindDonor;

const DropDown = ({ title, placeholder, list, onValueChange }) => {
  return (
    <View className="flex-1 px-3 h-14">
      <View className="border border-[#EAEAEA] rounded-xl bg-white">
        <RNPickerSelect
          onValueChange={onValueChange}
          style={{
            inputIOS: styles.pickerSelect,
            inputAndroid: styles.pickerSelect,
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
  );
};

const styles = StyleSheet.create({
  pickerSelect: {
    borderWidth: 1,
    borderRadius: 300,
  },
});
