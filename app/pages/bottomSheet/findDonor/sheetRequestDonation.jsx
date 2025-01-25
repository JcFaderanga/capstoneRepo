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
import ToggleButton from "../../../../components/UI/button/toggleBtn";
import useFetchUser from "../../../../hooks/user/useFetchUser";
import ThemeButton from "../../../../components/UI/button/themeButton";
import { useAuth } from "../../../../context/authContext";
import { ShowCompatibility } from "../../../../hooks/blood_validation/useBloodCopatibilty";
import * as Animatable from "react-native-animatable";
import { createPublicRequest } from "../../../../services/requestServices";
import { createNotification } from "../../../../services/notificationServices";
import useCreateNotification from "../../../../hooks/notification/useCreateNotification";
const sheetRequestDonation = forwardRef(({ donor_data }, ref) => {
  const [isBloodCompatible, setBloodCompatible] = useState(null);
  const [isRequestSubmit, setRequestSubmit] = useState(false);
  const [isRequestAnonymous, setRequestAnonymous] = useState(false);
  const { error, loading, insertNotif } = useCreateNotification();
  const [urgent, setUrgent] = useState(false);
  const { user: currentUser } = useAuth();
  if (!donor_data) return null;

  const { refreshing, selectedDonor } = donor_data;

  const { user: selected_donor, fetchUser } = useFetchUser();
  //console.log("isBloodCompatible", isBloodCompatible);
  useEffect(() => {
    if (selectedDonor?.id) {
      fetchUser(selectedDonor?.id);
    }
  }, [selectedDonor?.id]);

  useEffect(() => {
    if (refreshing) {
      fetchUser(selectedDonor?.id);
    }
  }, [refreshing]);

  const snapPoints = useMemo(() => {
    if (selectedDonor?.public_contact) return ["85%"];
    if (!isBloodCompatible) return ["50%"];
    return ["67%"];
  }, [selectedDonor, isBloodCompatible]);

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

  const handleSubmitRequest = async () => {
    const request_details = {
      user_id: currentUser?.id,
      blood_type: currentUser?.blood_type,
      units: 1,
      anonymous: isRequestAnonymous,
      anonymous_donor: selected_donor?.anonymous_donor,
      direct_request: true,
      requested_to: selected_donor?.id,
      urgent: urgent,
    };
    const reqData = await createPublicRequest(request_details);

    const newNotif = {
      sender_id: reqData?.data?.user_id,
      receiver_id: reqData?.data?.requested_to,
      notification_type: "blood_request_direct",
      data: {
        blood_request_id: reqData?.data?.blood_request_id,
        anonymous: reqData?.data?.anonymous,
        anonymous_donor: reqData?.data?.anonymous_donor,
        urgent: reqData?.data?.urgent,
        created_at: reqData?.data?.created_at,
      },
    };
    insertNotif(newNotif);
    console.log("newNotif", newNotif);

    setRequestSubmit(true);
    setTimeout(() => {
      ref.current?.close();
      setTimeout(() => setRequestSubmit(false), 500);
    }, 1400);
  };
  // Profile image options
  const profile = {
    Male: require("../../../../assets/icon/maleProfile.png"),
    Female: require("../../../../assets/icon/femaleProfile.png"),
  };

  // Custom handle for the bottom sheet
  const renderCustomHandle = () => {
    if (!isRequestSubmit) {
      return (
        <View className="h-14 w-full px-4 rounded-t-xl flex-row items-center justify-center">
          <Image
            source={
              selectedDonor?.anonymous_donor
                ? require("../../../../assets/icon/anonymouseIcon.png")
                : profile[selectedDonor?.gender] || null
            }
            className="w-44 h-44 rounded-full"
            resizeMode="contain"
          />
        </View>
      );
    }
  };
  //console.log(donor_data?.selectedDonor?.blood_type);
  useEffect(() => {
    const donorBloodType = donor_data?.selectedDonor?.blood_type || "";

    const recipientBloodType = currentUser?.blood_type || "";

    const recipientTypes = ShowCompatibility(recipientBloodType) || [];

    const canReceiveFrom =
      recipientTypes.canReceiveFrom.includes(donorBloodType);

    if (canReceiveFrom) {
      console.log("donor compatible");
      setBloodCompatible(true);
    }
    if (!canReceiveFrom) {
      console.log("donor not compatible");
      setBloodCompatible(false);
    }
  }, [isBloodCompatible, donor_data?.selectedDonor]);

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
        {isRequestSubmit ? (
          <Animatable.View
            animation="bounceIn"
            duration={500}
            easing={"ease-in"}
            interationCount="infinity"
            className="my-14 justify-center items-center "
          >
            <Image
              source={require("../../../../assets/icon/check.png")}
              resizeMode="contain"
              className=" h-[120px]"
            />
            <View>
              <Text className="font-bold text-xl text-[#4CAF50]">
                Request Sent
              </Text>
            </View>
          </Animatable.View>
        ) : (
          <View>
            <View className="flex-row items-center justify-center w-full mt-16">
              <Text className="font-bold text-2xl text-center">
                {selected_donor?.anonymous_donor
                  ? "Anonymous"
                  : `${selected_donor?.first_name} ${selected_donor?.last_name}`}
              </Text>
            </View>

            {/* Donor Information */}
            <View className="mt-4">
              {selected_donor?.anonymous_donor ||
              !selected_donor?.public_contact ? (
                <KeyValueRow
                  label="Blood Type"
                  value={selectedDonor?.blood_type}
                />
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
            {!isBloodCompatible ? (
              <Text className="text-center text-primary_red font-bold text-lg py-10">
                Your Blood type is not compatible with this donor.
              </Text>
            ) : (
              <>
                <View className="pt-5">
                  <View className="w-full h-16 border border-[#DCDCDC] flex-row items-center justify-between rounded-xl mb-4">
                    <View className="flex-1 flex-row justify-between items-center px-8 h-20">
                      <View className="flex-row items-center gap-3">
                        <Text className="font-bold text-[15px] text-primary_red">
                          Mark as urgent
                        </Text>
                      </View>
                      <ToggleButton
                        onPress={(isToggled) => setUrgent(isToggled)}
                        AlertTitle={"Set as urgent request"}
                        AlterDescription={
                          "Urgent request will still be depends on the review."
                        }
                      />
                    </View>
                  </View>
                  <View className="w-full h-16 border border-[#DCDCDC] flex-row items-center justify-between rounded-xl mb-4">
                    <View className="flex-1 flex-row justify-between items-center px-8 h-20">
                      <View className="flex-row items-center gap-3">
                        {/* <Image source={require('../../../../assets/icon/lock.png')} className="w-7" resizeMode='contain' /> */}
                        <Text className="font-bold text-[15px]">
                          Make my request Anonymous{" "}
                        </Text>
                      </View>
                      <ToggleButton
                        onPress={(isToggled) => setRequestAnonymous(isToggled)}
                        AlertTitle={"Anonymous Request"}
                        AlterDescription={
                          "Turning on Anonymous Request will hide your name and profile from the donor."
                        }
                      />
                    </View>
                  </View>
                </View>
                {/* Action Button */}
                <View className="mt-6">
                  <ThemeButton
                    disable={!isBloodCompatible ? true : false}
                    title="Send Request"
                    onPress={handleSubmitRequest}
                  />
                </View>
              </>
            )}
          </View>
        )}
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
