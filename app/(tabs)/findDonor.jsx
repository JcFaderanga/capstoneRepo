import { Image, Pressable, StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../../context/authContext';
import useFetchDonors from '../../hooks/find_donor/useFetchDonors';
import ThemeContainer from '../../components/UI/themeContainer';
import { ShowCompatibility } from '../../hooks/blood_validation/useBloodCopatibilty';
import RNPickerSelect from 'react-native-picker-select';
import DonorList from '../../components/donor__tab/donorList';
const FindDonor = () => {
  const [viewDonor, setViewDonor] = useState(false);
  const [compatibility, setCompatibility] = useState(null);
  const [typeFilter, setTypeFilter] = useState(null);
  const [anonymousFilter, setAnonymousFilter] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();
  const { donor, loading, error, fetchDonors } = useFetchDonors();

  useEffect(() => {
    if (!user) return;
    const bloodCompatibility = ShowCompatibility(user?.blood_type);
    setCompatibility(bloodCompatibility);
  }, [user]);

  useEffect(() => {
    if (compatibility?.canReceiveFrom?.length > 0) {
      const { canReceiveFrom } = compatibility;
      fetchDonors({ canReceiveFrom, typeFilter, anonymousFilter });
    }
  }, [compatibility, typeFilter, anonymousFilter]);

  const onRefreshDonors = async () => {
    setRefreshing(true);
    try {
      if (compatibility?.canReceiveFrom?.length > 0) {
        const { canReceiveFrom } = compatibility;
        await fetchDonors({ canReceiveFrom, typeFilter, anonymousFilter });
      }
    } catch (error) {
      console.error('Error refreshing donors:', error);
    } finally {
      setRefreshing(false);
    }
  };

  if (!user) {
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
              { label: 'Anonymous', value: 'true' },
              { label: 'Not Anonymous', value: 'false' },
            ]}
            onValueChange={(value) => setAnonymousFilter(value)}
          />
        </View>
        <DonorList donor={donor} onRefreshDonors={onRefreshDonors} refreshing={refreshing} />      
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
