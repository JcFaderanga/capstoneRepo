import { ScrollView, StyleSheet, Text, TextInput, View, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/authContext';
import CustomBtn from '../../components/UI/button/button';
import { supabase } from '../../lib/supabase';
import { getUserData } from '../../services/userServices';
import { useRouter } from 'expo-router';
const TextBoxBetween = ({ text, detail, onChangeText, value }) => {
  return (
    <View className="w-full h-16 flex-row justify-between items-center border-b border-b-[#F0F0F0]">
      <TextInput
        className="flex-1 text-base"
        onChangeText={onChangeText}
        value={value}
        placeholder={text} // optional placeholder
      />
      <Text className="text-[#e1e1e1] text-base">{detail}</Text>
    </View>
  );
};

const EditProfileInfo = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { user ,setUserData } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState({
    email: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    address: {
      street: '',
      region: '',
      province: '',
      city: '',
      barangay: '',
    },
    birth_date: '',
    gender: '',
    blood_type: '',
    phone_number: ''
  });

  useEffect(() => {
    if (user) {
      setProfile({
        email: user.email || '',
        first_name: user.first_name || '',
        middle_name: user.middle_name || '',
        last_name: user.last_name || '',
        address: {
          street: user.address?.street || '',
          region: user.address?.region || '',
          province: user.address?.province || '',
          city: user.address?.city || '',
          barangay: user.address?.barangay || '',
        },
        birth_date: user.birth_date || '',
        gender: user.gender || '',
        blood_type: user.blood_type || '',
        phone_number: user.phone_number || ''
      });
    }
  }, [user]);

  const updateProfile = async () => {
    let userData = {...profile};
    const { error } = await supabase
      .from('profile')
      .update(profile)
      .eq('id', user.id);

    if (error) {
      console.log('Error updating profile:', error);
    } else {
      console.log('Profile updated successfully',JSON.stringify(profile, null,2));
      setUserData({...user,...userData});
      router.back();
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    if (user?.id) {
      user
    }
    setRefreshing(false);
  };
  
  const formatDate = (date) => {
    return date ? date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }) : 'Select Date';
  };
  const DOB = new Date(user.birth_date);
  console.log("editProfile check date format:",formatDate(DOB))

  function capitalizeFirstLetter(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  
  const text = "hello WORLD";
  console.log(capitalizeFirstLetter(text)); 
  return (
    <View className="w-full h-full bg-[#f0f0f0]">
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {/* Name Section */}
        <View className="px-5 mb-3 bg-white" style={{ elevation: 1 }}>
          <Text className="text-primaryRed font-bold text-base mt-4">Your name</Text>
          <TextBoxBetween
            detail="First name"
            value={profile.first_name}
            onChangeText={(val) => setProfile({ ...profile, first_name: val })}
          />
          <TextBoxBetween
            detail="Middle name"
            value={profile.middle_name}
            onChangeText={(val) => setProfile({ ...profile, middle_name: val })}
          />
          <TextBoxBetween
            detail="Last name"
            value={profile.last_name}
            onChangeText={(val) => setProfile({ ...profile, last_name: val })}
          />
        </View>

        {/* Contact Section */}
        <View className="px-5 mb-3 bg-white" style={{ elevation: 1 }}>
          <Text className="text-primaryRed font-bold text-base mt-4">Your contact</Text>
          <TextBoxBetween
            detail="Email"
            value={capitalizeFirstLetter(profile.email)}
            onChangeText={(val) => setProfile({ ...profile, email: val })}
          />
          <TextBoxBetween
            detail="Phone"
            value={profile.phone_number}
            onChangeText={(val) => setProfile({ ...profile, phone_number: val })}
          />
        </View>
        <Text className="px-4 mx-auto mb-4 font-bold text-gray-400">NOTE: 
          <Text className="font-normal"> Updating the email in your contact information will not change your email username.</Text>
        </Text>
        {/* Birthday Section */}
        <View className="px-5 mb-3 bg-white" style={{ elevation: 1 }}>
          <Text className="text-primaryRed font-bold text-base mt-4">Your birthday</Text>
          <TextBoxBetween
            detail="Date of birth"
            value={formatDate(DOB)}
            onChangeText={(val) => setProfile({ ...profile, birth_date: val })}
          />
        </View>

        {/* Gender Section */}
        <View className="px-5 mb-3 bg-white" style={{ elevation: 1 }}>
          <Text className="text-primaryRed font-bold text-base mt-4">Your gender</Text>
          <TextBoxBetween
            detail="Gender"
            value={profile.gender}
            onChangeText={(val) => setProfile({ ...profile, gender: val })}
          />
        </View>

        {/* Blood Group Section */}
        <View className="px-5 mb-3 bg-white" style={{ elevation: 1 }}>
          <Text className="text-primaryRed font-bold text-base mt-4">Your Blood Group</Text>
          <TextBoxBetween
            detail="Blood Type"
            value={profile.blood_type}
            onChangeText={(val) => setProfile({ ...profile, blood_type: val })}
          />
        </View>

        {/* Address Section */}
        <View className="px-5 mb-3 bg-white" style={{ elevation: 1 }}>
          <Text className="text-primaryRed font-bold text-base mt-4">Your address</Text>
          <TextBoxBetween
            detail="Street"
            value={profile.address.street}
            onChangeText={(val) => setProfile({
              ...profile,
              address: { ...profile.address, street: val }
            })}
          />
          <TextBoxBetween
            detail="Region"
            value={profile.address.region}
            onChangeText={(val) => setProfile({
              ...profile,
              address: { ...profile.address, region: val }
            })}
          />
          <TextBoxBetween
            detail="Province"
            value={profile.address.province}
            onChangeText={(val) => setProfile({
              ...profile,
              address: { ...profile.address, province: val }
            })}
          />
          <TextBoxBetween
            detail="City"
            value={profile.address.city}
            onChangeText={(val) => setProfile({
              ...profile,
              address: { ...profile.address, city: val }
            })}
          />
          <TextBoxBetween
            detail="Barangay"
            value={profile.address.barangay}
            onChangeText={(val) => setProfile({
              ...profile,
              address: { ...profile.address, barangay: val }
            })}
          />
        </View>

        <CustomBtn title="Save" onPress={updateProfile} />
      </ScrollView>
    </View>
  );
};

export default EditProfileInfo;
