import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import ThemeButton from '../../components/UI/button/themeButton';
import { useLocalSearchParams, router } from 'expo-router';
import useSaveDonation from '../../hooks/blood_donation/useSaveDonation';
import { useAuth } from '../../context/authContext';
import DonationStatusBar from '../../components/request__tab/foryou/donationStatus';
import UseFetchDonationCount from '../../hooks/blood_donation/fetchDonationUnitCount';
import InputBoxDate from '../../components/UI/inputs/inputBoxDate';
const Donate = ({ request_data }) => {
  const [units, setUnits] = useState(0);
  const params = useLocalSearchParams();
  const [progress, setProgress] = useState({ percent: 0, left: 0 });
  const [selectedDate, setSelectedDate] = useState('');
  const [term, setTermBtn] = useState('');
  const [condition, setCondition] = useState(false);
  const { user } = useAuth();
  const { InsertDoation,error } = useSaveDonation();
  const request = JSON.parse(params?.request_data);
  console.log(selectedDate)
  const { totalUnits, FetchUnitCount } = UseFetchDonationCount();

  useEffect(() => {
    setTermBtn(condition ? '#F42F47' : 'transparent'); 
    }, [condition]);

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
  const MAX_UNIT = leftUnitCount > 2 ? 2 : leftUnitCount;

  const handleInsertDonation = () => {
    if (units > 0 && selectedDate) {
      const DONATION_DATA = {
        blood_request_id: request?.blood_request_id,
        donor: user?.id,
        recipient: request?.user_id,
        units_donated: units,
        schedule_date: selectedDate, 
        anonymous_donation: user?.anonymous_donor,
      };
      InsertDoation(DONATION_DATA);
      router.back();
      alert("Donation successful! Please be on time for your scheduled appointment. Your blood commitment matters.");
    } else {
      alert("Please check if you have filled out all fields.");
    }
  };

  return (
    <View className=" bg-white h-full">
      {/* <Text>Maximum blood units a person can donate in one session is 2 units.</Text> */}
      <DonationStatusBar request_data={request} progress={progress} />
      <View className="border border-[#DCDCDC] h-36 px-4 rounded-2xl py-4 mx-4">
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
      <View className="mt-[-20px]">
        <InputBoxDate
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          min= {true}
        />  
      </View>
      <View className="px-10 py-2">
        <Text className="text-center text-primary_red">{selectedDate? "Red Cross Muntinlupa is open from 8 AM to 5 PM and closed on Sundays."
 : '' }</Text>
      </View>
      <View className=" flex-row px-10 py-5 bg-slate-100">
          <Pressable className="w-4 h-4 border mt-1 mr-2" style={{backgroundColor: term}} onPress={()=>setCondition(!condition)}/>
          <Text>I pledge to be a responsible and consistent blood donor, contributing to saving lives and supporting those in need through my donations, whenever I am able.</Text>
      </View>
       { condition ? 
        <ThemeButton title={'Submit'} onPress={handleInsertDonation} /> 
        :
        <ThemeButton title={'Submit'} disable={true} /> 
       }
    </View>
  );
};

export default Donate;

const styles = StyleSheet.create({});
