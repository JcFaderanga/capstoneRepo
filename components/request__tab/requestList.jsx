import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import ToggleButton from '../../components/UI/button/toggleBtn';
import { useAuth } from '../../context/authContext';
import { supabase } from '../../lib/supabase';

const DonationSettings = () => {
  const [availability, setAvailability] = useState();
  const [anonymous, setAnonymous] = useState();
  const [loading, setLoading] = useState(true);  // New loading state

  const { user } = useAuth();

  // Fetch data when component loads or user changes
  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        setLoading(true);  // Start loading

        const { data, error } = await supabase
          .from('profile')
          .select('donation_availability, anonymous_donor')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching data:', error);
        } else {
          setAvailability(data.donation_availability);
          setAnonymous(data.anonymous_donor);
        }

        setLoading(false);  // Stop loading
      };

      fetchData();
    }
  }, [user]);

  let alert_title = '';
  let alert_description = '';
  if (user && user.blood_type === '--') {
    alert_title = 'Invalid Blood Group';
    alert_description = 'Please visit the nearest blood center to confirm your blood type or update your records to be eligible as a donor.';
  } else {
    alert_title = 'Available to Donate';
    alert_description = 'Turning on Available to Donate will display your profile in the list of available donors.';
  }

  const handleDonorAvailability = async (val) => {
    if (user.blood_type === '--') {
      console.log(user.blood_type, "is invalid blood type", user.donation_availability);
      return setAvailability(false);
    }
    const { error } = await supabase
      .from('profile')
      .update({ donation_availability: val })
      .eq('id', user.id);

    if (error) {
      console.error('Error updating availability:', error);
      setAvailability(!val);
    } else {
      setAvailability(val);
    }
    console.log(user.blood_type, "set as true and donor avail is =", user.donation_availability);
  };

  const handleAnonymousDonor = async (val) => {
    const { error } = await supabase
      .from('profile')
      .update({ anonymous_donor: val })
      .eq('id', user.id);

    if (error) {
      console.error('Error updating anonymous donor status:', error);
      setAnonymous(!val);
    } else {
      setAnonymous(val);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
        <Image resource={require('../../assets/icon/loading1.gif')}/>
      </View>
    );
  }

  return (
    <View className="h-full w-full bg-white">
      <View className="w-full h-28 bg-slate-100 border-gray-500 px-6 my-1 flex-row items-center">
        <View className="flex-1">
          <Text className="font-bold text-lg">Available to Donate</Text>
          <Text>Set your availability status for donations.</Text>
        </View>
        <ToggleButton
          AlertTitle={alert_title}
          AlterDescription={alert_description}
          onPress={handleDonorAvailability}
          status={availability}
        />
      </View>
      <View className="w-full h-28 bg-slate-100 border-gray-500 px-6 my-1 flex-row items-center">
        <View className="flex-1">
          <Text className="font-bold text-lg">Show Contacts</Text>
          <Text>Share your contact details with recipients.</Text>
        </View>
        <ToggleButton
          AlertTitle={'Show Contact'}
          AlterDescription={
            'By sharing your contact information publicly, you allow recipients to reach out to you privately.'
          }
          onPress={handleAnonymousDonor}
          status={anonymous}
        />
      </View>
      <View className="w-full h-28 bg-slate-100 border-gray-500 px-6 my-1 flex-row items-center">
        <View className="flex-1">
          <Text className="font-bold text-lg">Anonymous Donor</Text>
          <Text>Donate without revealing your identity.</Text>
        </View>
        <ToggleButton
          AlertTitle={'Anonymous Donor'}
          AlterDescription={
            'Turning on Anonymous Donor will hide your name and profile from the donor list.'
          }
          onPress={handleAnonymousDonor}
          status={anonymous}
        />
      </View>
    </View>
  );
};

export default DonationSettings;

const styles = StyleSheet.create({});
