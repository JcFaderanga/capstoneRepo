import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import ThemeContainer from '../../components/UI/themeContainer';
import ThemeButton from '../../components/UI/button/themeButton';
import { useLocalSearchParams, router } from 'expo-router';
import useFetchUser from '../../hooks/user/useFetchUser';
import { useAuth } from '../../context/authContext';
import { FetchRequest } from '../../hooks/my_request_hooks';

const KeyValueRow = ({ label, value }) => (
  <View className="flex-row justify-between items-center py-2">
    <Text className="font-bold text-base text-gray-800">{label}:</Text>
    <Text className="text-base text-gray-600">{value || 'N/A'}</Text>
  </View>
);

const DonationReview = () => {
  const { user: current_user } = useAuth();
  const params = useLocalSearchParams();
  const donationData = JSON.parse(params?.donation_details);

  const { user: user_recipient, fetchUser } = useFetchUser();
  const { request, fetchRequest } = FetchRequest();

  useEffect(() => {
    if (current_user) {
      fetchUser(donationData?.recipient); 
      fetchRequest(donationData?.blood_request_id); 
    }
  }, [current_user]);

  if (!current_user) return null;

  const {
    blood_donation_id,
    anonymous_donation,
    blood_request_id,
    created_at,
    donor,
    recipient,
    schedule_date,
    status,
    units_donated,
  } = donationData || {}; 

  const {
    first_name = 'Unknown', 
    last_name = 'Recipient',
  } = user_recipient || {}; 

  const {
    blood_type,
    units,
    urgent,
  } = request || {};

  return (
    <ThemeContainer bgColor={'white'}>
      {/* Header */}
      <View className="w-full h-16 bg-white justify-center items-center ">
        <Text className="text-center font-bold text-lg tracking-wide text-gray-800">
          APPOINTMENT ID: {blood_donation_id || 'N/A'}
        </Text>
      </View>
      
      {/* Organized Data */}
      <View className=" px-4 py-6 space-y-4">
        {/* Appointment Details */}
        <KeyValueRow label="Created At" value={new Date(created_at).toLocaleString()} />
        <KeyValueRow label="Schedule Date" value={new Date(schedule_date).toLocaleString()} />

        {/* Donor Details */}
        <KeyValueRow label="Donor Id" value={donor} />
        <KeyValueRow label="Donor Name" value={`${current_user?.first_name} ${current_user?.last_name}` } />
        <KeyValueRow label="Donor Blood Type" value={current_user?.blood_type} />

        {/* Recipient Details */}
        <KeyValueRow label="Recipient Id" value={recipient} />
        <KeyValueRow label="Recipient Name" value={`${first_name} ${last_name}`} />
        <KeyValueRow label="Recipient Blood Type" value={blood_type} />

        {/* Blood Request Details */}
        <KeyValueRow label="Blood Request ID" value={blood_request_id} />
        <KeyValueRow label="Units Needed" value={units} />
        <KeyValueRow label="Units Donated" value={units_donated} />
        <KeyValueRow label="Anonymous Request" value={anonymous_donation ? 'Yes' : 'No'} />
        <KeyValueRow label="Anonymous Donation" value={'Unkown'} />

        {/* Additional Info */}
        <KeyValueRow label="Urgent" value={urgent ? 'Yes' : 'No'} />
        <KeyValueRow label="Status" value={status} />
      </View>

      {/* Button */}
      <View className="px-4">
        <ThemeButton title="Done" onPress={() => router.back()} />
      </View>
    </ThemeContainer>
  );
};

export default DonationReview;

const styles = StyleSheet.create({});
