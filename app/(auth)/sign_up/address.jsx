import React, { useState, useMemo, useCallback } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import ThemeButton from '../../../components/UI/button/themeButton';
import InputBox from '../../../components/UI/inputs/inputBox';
import DropDown from '../../../components/UI/inputs/dropDown';
import SignUpHeader from '../../../components/signUpHeader';
import philData from 'phil-reg-prov-mun-brgy';
import useTextValidation from '../../../hooks/validation/useTextValidation';
import { useRegistrationStorage } from '../../../hooks/sign_up_hooks/useRegistrationStorage';

const Address = () => {
  const [address, setAddress] = useState({
    street: '',
    region: '',
    province: '',
    city: '',
    barangay: '',
  });

  const { addDetails } = useRegistrationStorage();
  const { textError: streetError, setTextError: setStreetError } = useTextValidation();
  const router = useRouter();

  // Memoized region, province, city, and barangay lists
  const regionList = useMemo(
    () => philData.regions.map(region => ({ label: region.name, value: region.reg_code })),
    []
  );

  const provinceList = useMemo(() => {
    const provinces = philData.getProvincesByRegion(address.region);
    return provinces.map(province => ({ label: province.name, value: province.prov_code }));
  }, [address.region]);

  const cityList = useMemo(() => {
    const cities = philData.getCityMunByProvince(address.province);
    return cities.map(city => ({ label: city.name, value: city.mun_code }));
  }, [address.province]);

  const barangayList = useMemo(() => {
    const barangays = philData.getBarangayByMun(address.city);
    return barangays.map(barangay => ({ label: barangay.name, value: barangay.name }));
  }, [address.city]);

  // Utility functions for extracting names
  const getRegionName = useCallback(
    () => philData.regions.find(val => val.reg_code === address.region)?.name || 'Region not found',
    [address.region]
  );

  const getProvinceName = useCallback(
    () => philData.provinces.find(val => val.prov_code === address.province)?.name || 'Province not found',
    [address.province]
  );

  const getCityName = useCallback(
    () => philData.city_mun.find(val => val.mun_code === address.city)?.name || 'City not found',
    [address.city]
  );

  const handleProfile = useCallback(() => {
    const { street, region, province, city, barangay } = address;

    if (!street || !region || !province || !city || !barangay) {
      setStreetError('No./Blk./St./Sub. is required');
      Alert.alert('Complete all fields to continue');
      return;
    }

    setStreetError('');
    addDetails({
      address: {
        street,
        region: getRegionName(),
        province: getProvinceName(),
        city: getCityName(),
        barangay,
      },
    });
    router.push('./gender');
  }, [address, addDetails, getRegionName, getProvinceName, getCityName, setStreetError, router]);

  const updateAddress = (field, value) => {
    setAddress(prev => ({ ...prev, [field]: value }));
  };

  return (
    <View className="bg-white h-full w-full">
      <ScrollView className="w-full h-full">
        <SignUpHeader text="What's your Address?" />
        <DropDown
          title="Select region"
          placeholder="Region"
          list={regionList}
          onValueChange={value => updateAddress('region', value)}
        />
        <DropDown
          title="Select province"
          placeholder="Province"
          list={provinceList}
          onValueChange={value => updateAddress('province', value)}
        />
        <DropDown
          title="Select city"
          placeholder="City"
          list={cityList}
          onValueChange={value => updateAddress('city', value)}
        />
        <DropDown
          title="Select barangay"
          placeholder="Barangay"
          list={barangayList}
          onValueChange={value => updateAddress('barangay', value)}
        />
        <InputBox
          detail="No./Blk./St./Sub."
          value={address.street}
          onChangeText={value => updateAddress('street', value)}
          title="No./Blk./St./Sub."
          validationError={streetError}
        />
        <ThemeButton title="Continue" onPress={handleProfile} />
      </ScrollView>
    </View>
  );
};

export default Address;

