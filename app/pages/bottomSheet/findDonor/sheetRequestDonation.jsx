import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState, useEffect, useMemo, useCallback, forwardRef } from 'react';
import { BottomSheetView, BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import useFetchUser from '../../../../hooks/user/useFetchUser';
import ThemeButton from '../../../../components/UI/button/themeButton';

const sheetRequestDonation = forwardRef(({ donor_data }, ref) => {
  if (!donor_data) return null;

  const { refreshing, selectedDonor } = donor_data;
  const { user, fetchUser } = useFetchUser();
  useEffect(() => {
    if (selectedDonor?.id) {
      fetchUser(selectedDonor.id);
    }
  }, [selectedDonor?.id]);

  useEffect(() => {
    if (refreshing) {
      fetchUser(selectedDonor.id);
    }
  }, [refreshing]); 

  const snapPoints = useMemo(() => ['60%', '80%'], []);
  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
    []
  );

  // Profile image options
  const profile = {
    Male: require('../../../../assets/icon/maleProfile.png'),
    Female: require('../../../../assets/icon/femaleProfile.png'),
  };

  // Custom handle for the bottom sheet
  const renderCustomHandle = () => (
    <View className="h-14 w-full px-4 rounded-t-xl flex-row items-center justify-center">
      <Image
        source={selectedDonor?.anonymous_donor
          ? require('../../../../assets/icon/anonymouseIcon.png')
          : profile[selectedDonor?.gender] || null} // Fallback for missing gender
        className="w-44 h-44 rounded-full"
        resizeMode="contain"
      />
    </View>
  );

  return (
    <BottomSheetModal ref={ref} snapPoints={snapPoints} handleComponent={renderCustomHandle} backdropComponent={renderBackdrop}>
      <BottomSheetView className="w-full h-full px-4 py-6">
        {/* Donor Name */}
        <View className="flex-row items-center justify-center w-full mt-16">
          <Text className="font-bold text-2xl text-center">
            {user?.anonymous_donor ? 'Anonymous' : `${user?.first_name} ${user?.last_name}`}
          </Text>
        </View>

        {/* Donor Information */}
        <View className="mt-4">
          {user?.anonymous_donor || !user?.public_contact ? (
            <KeyValueRow label="Blood Type" value={selectedDonor?.blood_type} />
          ) : (
            <>
              <KeyValueRow label="Email" value={selectedDonor?.email} />
              <KeyValueRow label="Phone Number" value={selectedDonor?.phone_number} />
              <KeyValueRow label="Blood Type" value={selectedDonor?.blood_type} />
            </>
          )}
        </View>

        {/* Action Button */}
        <View className="mt-6">
          <ThemeButton
            title="Send Request"
            onPress={() => {
              // Example action: trigger onRefreshDonors or handle the request
              if (onRefreshDonors) {
                onRefreshDonors(); // Trigger refresh if needed
              }
            }}
          />
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

// Key-Value Row Component for better reusability
const KeyValueRow = ({ label, value }) => (
  <View className="px-4 rounded-2xl my-1 bg-slate-100 py-3">
    <Text className="font-bold text-base text-gray-800">{label}:</Text>
    <Text className="text-base text-gray-600">{value || 'N/A'}</Text>
  </View>
);

export default sheetRequestDonation;

const styles = StyleSheet.create({});
