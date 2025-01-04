import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import ThemeButton from '../../components/UI/button/themeButton';
import { useLocalSearchParams } from 'expo-router';
import useSaveDonation from '../../hooks/blood_donation/useSaveDonation';
import { useAuth } from '../../context/authContext';
import DonationStatusBar from '../../components/request__tab/foryou/donationStatus';
import UseFetchDonationCount from '../../hooks/blood_donation/fetchDonationUnitCount';

const Donate = ({ request_data }) => {
  const [units, setUnits] = useState(0);
  const params = useLocalSearchParams();
  const [progress, setProgress] = useState({ percent: 0, left: 0 });
  const { user } = useAuth();
  const { InsertDoation } = useSaveDonation();
  const request = JSON.parse(params?.request_data);
  console.log(request)
  const { totalUnits, FetchUnitCount } = UseFetchDonationCount();
  
  useEffect(() => {
    FetchUnitCount(request?.blood_request_id);
  }, []);
 
  useEffect(() => {
    // Check if totalUnits and request.units are valid
    if (totalUnits !== undefined && request?.units) {
      // Current progress values based on fetched totalUnits
      const currentLeft = request.units - totalUnits; 
      const currentPercent = totalUnits / request.units;
  
      // Adjust progress based on current user input (units)
      const updatedLeft = currentLeft - units;
      const updatedPercent = currentPercent + (units / request.units);
  
      // Update progress state
      setProgress({
        percent: updatedPercent,
        left: updatedLeft,
      });
    }
  }, [units, totalUnits]);  

  const leftUnitCount = request?.units - totalUnits;
  const MAX_UNIT = leftUnitCount > 10 ? 10 : leftUnitCount;

  const handleInsertDonation = () => {
    if (units > 0) {
      const DONATION_DATA = {
        blood_request_id: request?.blood_request_id,
        donor: user?.id,
        recipient: request?.user_id,
        units_donated: units,
        anonymous_donation: user?.anonymous_donor,
      };
      InsertDoation(DONATION_DATA);
    } else {
      alert("Please select at least 1 unit to donate.");
    }
  };

  return (
    <View className="px-4">
      <Text>Maximum blood units a person can donate in one session is 10 units.</Text>
      <DonationStatusBar request_data={request} progress={progress} />
      <View className="border border-[#DCDCDC] h-36 px-4 rounded-2xl py-4 mb-4">
        <Text className="text-lg py-1">How many units will you be donating?</Text>
        <View className="w-full h-14 border border-[#DCDCDC] flex-row items-center justify-between px-4 rounded-xl">
          <View>
            <Text className="text-xl font-bold text-customgray">
              {units} <Text className="font-normal">unit(s)</Text>
            </Text>
          </View>
          <View className="flex-row items-center">
            <Pressable
              onPress={() => units > 0 && setUnits(units - 1)}
              className="p-2"
            >
              <Image
                source={require('../../assets/icon/minus.png')}
                className="w-5"
                resizeMode="contain"
              />
            </Pressable>
            <Pressable
              onPress={() => units < MAX_UNIT && setUnits(units + 1)}
              className="px-2"
            >
              <Image
                source={require('../../assets/icon/add.png')}
                className="w-5"
                resizeMode="contain"
              />
            </Pressable>
          </View>
        </View>
      </View>
      <ThemeButton title={'Submit'} onPress={handleInsertDonation} />
    </View>
  );
};

export default Donate;

const styles = StyleSheet.create({});
