import {
    View,
    SafeAreaView,
    ScrollView,
    Text,
} from 'react-native';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import ThemeButton from '../../../components/UI/button/themeButton'
import InputBox from '../../../components/UI/inputs/inputBox'
import { useRouter, useLocalSearchParams } from 'expo-router';
import SignUpHeader from '../../../components/signUpHeader';
import philData from 'phil-reg-prov-mun-brgy';
import DropDown from '../../../components/UI/inputs/dropDown';
import { Alert } from 'react-native';
import useTextValidation from '../../../hooks/validation/useTextValidation';
import { useRegistrationStorage } from '../../../hooks/sign_up_hooks/useRegistrationStorage';
const Address = () => { 
    const [street, setStreet] = useState('');
    const [region, setRegion] = useState('13');
    const [province, setProvince] = useState('1376');
    const [city, setCity] = useState('');
    const [barangay, setBarangay] = useState('');

    const {addDetails} = useRegistrationStorage();
    const{textError: streetError, setTextError: setStreetError} = useTextValidation();

    
    const router = useRouter();

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

    const handleProfile = () => {
        let allFieldsFilled = true;
        // First name validation 
        if (street === '' && region === '' && province === '' && city === '' && barangay === '') {
            setStreetError('No./Blk./St./Sub. is required');
            allFieldsFilled = false;  
            Alert.alert("Complete all field to continue") 
        } 
        else {
            setStreetError('');
        }

        if (allFieldsFilled) {
            addDetails({
                address:{
                    street,
                    region:regionName,
                    province:provinceName,
                    city:cityName,
                    barangay,
                },
            })
            router.push('./gender');
        }
    };
    return (
        <View className="bg-white h-full">
                <ScrollView>
                    <SignUpHeader text={`What's your Address?`} />
                
                    <DropDown
                        title = {"Select region"}
                        placeholder =  {regionName}
                        list = {regionList}
                        onValueChange={(value) => setRegion(value)}
                    />
                    <DropDown
                        title = {"Select province"}
                        placeholder =  {provinceName}
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
                    <InputBox
                        detail="No./Blk./St./Sub."
                        value={street}
                        onChangeText={(val) => setStreet(val)}
                        title="No./Blk./St./Sub."
                        validationError={streetError}
                    />
                    <ThemeButton title={'Continue'} onPress={handleProfile} />
                </ScrollView>
        </View>
    );
};


export default Address;
