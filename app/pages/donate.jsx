import { StyleSheet, Text, View,Pressable,Image, ImageBackground } from 'react-native'
import React,{useEffect, useState} from 'react'
import ThemeButton from '../../components/UI/button/themeButton';
import { useRouter,useLocalSearchParams  } from 'expo-router';
import useSaveDonation from '../../hooks/blood_donation/useSaveDonation';
import { useAuth } from '../../context/authContext';
import DonationStatusBar from '../../components/request__tab/foryou/donationStatus';
const Donate = ({request_data}) => {
    const [units, setUnits] = useState(0);
    const params = useLocalSearchParams();
    const [progress, setProgress] = useState({percent: 0, left: 0});
    const {user} = useAuth();
    const { loading, InsertDoation} = useSaveDonation();

    const request = JSON.parse(params?.request_data);
    const {blood_request_id, units: unit_request} = request;
    const DONATION_DATA = {
        blood_request_id: blood_request_id,
        donor: user?.id,
        units_donated:units, 
        anonymous_donation: user?.anonymous_donor
    }
    const handleInsertDonation =()=>{
        InsertDoation(DONATION_DATA);
    }

    useEffect(()=>{
        const percent = units / unit_request;
        const left = unit_request - units;
        setProgress({percent, left})
    },[units])
    
    const MAX_UNIT = unit_request > 10 ? 10 : unit_request;
  return (
    <View className="px-4">
        <Text>maximum blood unit can a person donate in one session is 10 unit</Text>
        <DonationStatusBar request_data={request} progress={progress}/>
        <View className=" border border-[#DCDCDC] h-36 px-4 rounded-2xl py-4 mb-4">
            <Text className="text-lg py-1">How many units will you be donating?</Text>
            <View className="w-full h-14 border border-[#DCDCDC] flex-row items-center justify-between px-4 rounded-xl">
                <View>
                    <Text className="text-xl font-bold text-customgray">{units} <Text className="font-normal">unit(s)</Text></Text>
                </View>
                <View className=" flex-row items-center">
                    <Pressable onPress={()=>units > 0 && setUnits(units -1)}  className="  p-2">
                        <Image source={require('../../assets/icon/minus.png')} className="w-5" resizeMode="contain"/>
                    </Pressable> 
                    <Pressable onPress={()=> units < MAX_UNIT && setUnits(units +1)} className="px-2">
                        <Image source={require('../../assets/icon/add.png')}  className="w-5" resizeMode="contain"/>
                    </Pressable>
                </View>
            </View>
        </View>
        <ThemeButton title={'Submit'} onPress={handleInsertDonation}/>
    </View>
  )
}

export default Donate
const styles = StyleSheet.create({})