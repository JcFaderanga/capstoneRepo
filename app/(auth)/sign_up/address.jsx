import {
    View,
    SafeAreaView,
    ScrollView,
    Text,
} from 'react-native';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import CustomBtn from '../../../components/UI/button/button'
import InputBox from '../../../components/UI/inputs/inputBox'
import { useRouter, useLocalSearchParams } from 'expo-router';
import SignUpHeader from '../../../components/signUpHeader';
import philData from 'phil-reg-prov-mun-brgy';
import DropDown from '../../../components/UI/inputs/dropDown';
import { Alert } from 'react-native';
const Address = () => { 
    const [street, setStreet] = useState('');
    const [region, setRegion] = useState('');
    const [province, setProvince] = useState('');
    const [city, setCity] = useState('');
    const [barangay, setBarangay] = useState('');

    const [streetError, setStreetError] = useState({ condition: false, message: '' });
    
    const router = useRouter();
    const params = useLocalSearchParams();

    const regionList = philData.regions.map((region) => ({
        label: region.name, 
        value: region.reg_code,  
      }));
      const provincesInRegion = philData.getProvincesByRegion(region);
      const provinceList = provincesInRegion.map((province) => ({
        label: province.name, 
        value: province.prov_code, 
      }));
      const cityInProvince = philData.getCityMunByProvince(province);
      const cityList = cityInProvince.map((city) => ({
        label: city.name, 
        value: city.mun_code,
      }));
      const barangayInCity = philData.getBarangayByMun(city);
      const barangayList = barangayInCity.map((barangay) => ({
        label: barangay.name, 
        value: barangay.name, 
      }));

    const selectedRegion = philData.regions.find(val => val.reg_code === region);
    const selectedProvince = philData.provinces.find(val => val.prov_code === province);
    const selectedCity = philData.city_mun.find(val => val.mun_code === city);

    const regionName = selectedRegion ? selectedRegion.name : 'Region not found';
    const provinceName = selectedProvince ? selectedProvince.name : 'Region not found';
    const cityName = selectedCity ? selectedCity.name : 'Region not found';

    console.log(regionName + provinceName + cityName + barangay);

    const handleProfile = () => {
        let allFieldsFilled = true;
        // First name validation 
        if (street === '' && region === '' && province === '' && city === '' && barangay === '') {
            setStreetError({ condition: true, message: 'No./Blk./St./Sub. is required' });
            allFieldsFilled = false;  
            Alert.alert("Complete all field to continue") 
        } 
        else {
            setStreetError({ condition: false, message: '' });
        }

        if (allFieldsFilled) {
            router.push({
                pathname: './gender',
                params: {
                    ...params,
                    street,
                    regionName,
                    provinceName,
                    cityName,
                    barangay,
                },
            });
        }
    };
    return (
        <View>
            <SafeAreaView className="bg-white h-full">
                <ScrollView>
                    <SignUpHeader text={`What's your Address?`} />
                    
                    <InputBox
                        detail="No./Blk./St./Sub."
                        value={street}
                        onChangeText={(val) => {
                            setStreet(val);
                            if (val.trim() !== '') setStreetError({ condition: false, message: '' });
                        }}
                        title="No./Blk./St./Sub."
                        borderWidth={streetError.condition ? 2 : 1}
                        borderColor={streetError.condition ? 'red' : '#EAEAEA'}
                        message={streetError}
                    />
                    <DropDown
                        title = {"Select region"}
                        placeholder =  {"Region"}
                        list = {regionList}
                        onValueChange={(value) => setRegion(value)}
                    />
                    <DropDown
                        title = {"Select province"}
                        placeholder =  {"Province"}
                        list = {provinceList}
                        onValueChange={(value) => setProvince(value)}
                    />
                    <DropDown
                        title = {"Select City"}
                        placeholder =  {"City"}
                        list = {cityList}
                        onValueChange={(value) => setCity(value)}
                    />
                    <DropDown
                        title = {"Select Barangay"}
                        placeholder =  {"Barangay"}
                        list = {barangayList}
                        onValueChange={(value) => setBarangay(value)}
                    />

                    <CustomBtn title={'Continue'} onPress={handleProfile} />
                </ScrollView>
            </SafeAreaView>
            <StatusBar backgroundColor="#F42F47" style="light" />
        </View>
    );
};


export default Address;
