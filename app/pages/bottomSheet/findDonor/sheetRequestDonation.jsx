import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState, useCallback, useMemo, useRef, forwardRef, useEffect } from 'react';
import { BottomSheetView, BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import useFetchUser from '../../../../hooks/user/useFetchUser';
import ThemeButton from '../../../../components/UI/button/themeButton';

const sheetRequestDonation = forwardRef(({ donor_data }, ref) => {
  const { user, loading, error, fetchUser } = useFetchUser();

  useEffect(() => {
    fetchUser(donor_data?.id);
  }, [donor_data?.id]);

  const snapPoints = useMemo(() => ['60%', '80%'], []);
  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
    []
  );
  const profile ={
    Male: require('../../../../assets/icon/maleProfile.png'),
    Female: require('../../../../assets/icon/femaleProfile.png')
  }
  const renderCustomHandle = () => (
    <View className="h-14 w-full px-4 rounded-t-xl flex-row items-center justify-center">
      <Image 
        source={donor_data?.anonymous_donor ? require('../../../../assets/icon/anonymouseIcon.png') : profile[donor_data?.gender]}
        className="w-44 h-44 rounded-full" 
        resizeMode="contain"
      />
    </View>
  );
 
  return (
    <BottomSheetModal 
      ref={ref} 
      snapPoints={snapPoints} 
      handleComponent={renderCustomHandle} 
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView className="w-full h-full px-4 py-6">
        {/* Donor Name */}
        <View className="flex-row items-center justify-center w-full mt-16">
          <Text className="font-bold text-2xl text-center">
            {user?.anonymous_donor 
              ? 'Anonymous' 
              : `${user?.first_name} ${user?.last_name}`
            }
          </Text>
        </View>
        {/* Donor Information */}
        <View className="mt-4">
        {user?.anonymous_donor || !user?.public_contact ? (
            <KeyValueRow label="Blood Type" value={donor_data?.blood_type} />
          ) : (
            <>
              <KeyValueRow label="Email" value={donor_data?.email} />
              <KeyValueRow label="Phone Number" value={donor_data?.phone_number} />
              <KeyValueRow label="Blood Type" value={donor_data?.blood_type} />
            </>
          )}
        </View>
        {/* Action Button */}
        <View className="mt-6">
          <ThemeButton title="Send Request" />
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
