import { StyleSheet, Text, View, Image } from "react-native";
import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  forwardRef,
} from "react";
import {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import useFetchUser from "../../../../hooks/user/useFetchUser";
import ThemeButton from "../../../../components/UI/button/themeButton";
import { useAuth } from "../../../../context/authContext";
import { ShowCompatibility } from "../../../../hooks/blood_validation/useBloodCopatibilty";
const sheetRequestDonation = forwardRef(({ donor_data }, ref) => {
  const [isBloodCompatible, setBloodCompatible] = useState(null);
  const { user: currentUser } = useAuth();
  if (!donor_data) return null;
  const { refreshing, selectedDonor } = donor_data;
  const { user, fetchUser } = useFetchUser();
  //console.log("isBloodCompatible", isBloodCompatible);
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

  const snapPoints = useMemo(
    () => (selectedDonor?.public_contact ? ["65%", "80%"] : ["50%", "60%"]),
    [selectedDonor]
  );

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );

  // Profile image options
  const profile = {
    Male: require("../../../../assets/icon/maleProfile.png"),
    Female: require("../../../../assets/icon/femaleProfile.png"),
  };

  // Custom handle for the bottom sheet
  const renderCustomHandle = () => (
    <View className="h-14 w-full px-4 rounded-t-xl flex-row items-center justify-center">
      <Image
        source={
          selectedDonor?.anonymous_donor
            ? require("../../../../assets/icon/anonymouseIcon.png")
            : profile[selectedDonor?.gender] || null
        } // Fallback for missing gender
        className="w-44 h-44 rounded-full"
        resizeMode="contain"
      />
    </View>
  );

  useEffect(() => {
    const donorBloodType = selectedDonor?.blood_type || "";
    const recipientBloodType = currentUser?.blood_type || "";
    const recipientTypes = ShowCompatibility(recipientBloodType) || [];
    const canReceiveFrom =
      recipientTypes.canReceiveFrom.includes(donorBloodType);
    if (canReceiveFrom) {
      setBloodCompatible(true);
    } else if (!canReceiveFrom) {
      setBloodCompatible(false);
    }
  }, [isBloodCompatible, selectedDonor]);

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      handleComponent={renderCustomHandle}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView className="w-full h-full px-4 py-6">
        {/* Donor Name */}
        <View className="flex-row items-center justify-center w-full mt-16">
          <Text className="font-bold text-2xl text-center">
            {user?.anonymous_donor
              ? "Anonymous"
              : `${user?.first_name} ${user?.last_name}`}
          </Text>
        </View>
        {!isBloodCompatible ? (
          <Text className="text-center text-primary_red font-bold text-base">
            Your Blood type is not compatible with this donor
          </Text>
        ) : (
          ""
        )}
        {/* Donor Information */}
        <View className="mt-4">
          {user?.anonymous_donor || !user?.public_contact ? (
            <KeyValueRow label="Blood Type" value={selectedDonor?.blood_type} />
          ) : (
            <>
              <KeyValueRow label="Email" value={selectedDonor?.email} />
              <KeyValueRow
                label="Phone Number"
                value={selectedDonor?.phone_number}
              />
              <KeyValueRow
                label="Blood Type"
                value={selectedDonor?.blood_type}
              />
            </>
          )}
        </View>

        {/* Action Button */}
        <View className="mt-6">
          <ThemeButton
            disable={!isBloodCompatible ? true : false}
            title="Send Request"
            onPress={() => console.log("pressed")}
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
    <Text className="text-base text-gray-600">{value || "N/A"}</Text>
  </View>
);

export default sheetRequestDonation;

const styles = StyleSheet.create({});
