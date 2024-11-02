import { Image, Pressable, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import Elevated from '../../components/elevated';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/authContext';
import ModalDirectRequest from '../../components/Modals/DirectRequest/ModalDirectRequest';
import { ScrollView } from 'react-native';
import { homeIcons } from '../../constant';
import { avatar__icon } from '../../services/userAvatar';
const FindDonor = () => {
  const { user } = useAuth();
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [avatar_image, setAvatarImage] = useState(null);
  console.log("this donors -", JSON.stringify(donors,null,4) )
  useEffect(() => {
    const getDonors = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset error state
      try {
        const { data, error } = await supabase
          .from('profile')
          .select('*')
          .is('donation_availability', true);

        if (error) {
          throw new Error(error.message);
        }

        setDonors(data);
      } catch (e) {
        setError(e.message); // Set error state
      } finally {
        setLoading(false); // Stop loading
      }
    };

    getDonors();
  }, []);
  
  console.log("this requrst avatar = ",avatar_image)
  useEffect(() => {
      const fetchAvatar = async () => {
          const avatar = await avatar__icon(donors.id);
          setAvatarImage(avatar);
        }
      fetchAvatar();
    }, []);

  const handlePress = (donor) => {
    setSelectedDonor(donor);
     setModalVisible(true);
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#F42F47" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }

  return (
    <View className="bg-white flex-1 border">
      <ScrollView>
        {donors.map((donor) => {
          const isUserDonor = user && user.id === donor.id;
          const bgColor = isUserDonor ? '#FFEFF1' : '#FFFFFF';
          const donorName = isUserDonor ? 'You' : (donor.anonymous_donor ? "Anonymous" : `${donor.first_name} ${donor.last_name}`);

          return (
            <Pressable 
              key={donor.id}
              className="w-11/12 h-24 mx-auto my-2" 
              onPress={() => handlePress(donor)}
              accessibilityLabel={`Donor: ${donorName}, Blood Type: ${donor.blood_type}`}
            >
              <Elevated width={'100%'} height={'100%'}>
                <View 
                  className="flex-1 flex-row justify-between items-center px-6 rounded-[10px]"
                  style={{ backgroundColor: bgColor }}
                > 
                  <View className="flex-row items-center">
                    <Image
                      source={donor.anonymous_donor
                        ? require('../../assets/icon/anonymouseIcon.png')
                        : avatar_image}
                      resizeMode="contain"
                      className="w-14 h-14 rounded-full"
                    />
                    <View className="px-3 w-40">
                      <Text
                        className="text-base font-bold"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {donorName}
                      </Text>
                      <Text className="text-[12px] leading-[13px] text-gray-500">
                        ID: {donor.anonymous_donor ? "- - - - - - - - - -" : donor.id}
                      </Text>
                    </View>
                  </View>
                  <Text className="text-primaryRed text-3xl font-bold">{donor.blood_type}</Text>
                </View>
              </Elevated>
            </Pressable>
          );
        })}
        <ModalDirectRequest
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          donorInfo={selectedDonor} 
        />
     </ScrollView> 
    </View>
  );
};

export default FindDonor;


