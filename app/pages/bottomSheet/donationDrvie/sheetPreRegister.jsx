import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  forwardRef,
} from "react";
import { Text, View, Pressable, Image } from "react-native";
import {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import * as Animatable from "react-native-animatable";
import InputBox from "../../../../components/UI/inputs/inputBox";
import ThemeButton from "../../../../components/UI/button/themeButton";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { DayAndDate, CalculateAge } from "../../../../constant/timeStamp";
import { useAuth } from "../../../../context/authContext";
import useSaveDonation from "../../../../hooks/blood_donation/useSaveDonation";
import UseFetchDonation from "../../../../hooks/blood_donation/fetchDonation";

const PreRegister = forwardRef(({ props }, ref) => {
  const { user } = useAuth();
  const [isSubmitSuccess, setSubmitSuccess] = useState(false);
  const [condition, setCondition] = useState(false);
  const [isWeightValid, setWeightValid] = useState(true);
  const [isAgeValid, setValidAge] = useState(true);
  const [weight, setWeight] = useState("");
  const age = CalculateAge(user?.birth_date);
  const { error, InsertDoation } = useSaveDonation();
  const { donationData, loading, FetchDonation } = UseFetchDonation({});

  useEffect(() => {
    FetchDonation(user?.id);
  }, [props, isSubmitSuccess]);

  const isDrivePending = props
    ? donationData.some(
        (d) => d.recipient === props.drive_id && d.status === "pending"
      )
    : false;

  const snapPoints = useMemo(() => {
    if (isDrivePending && loading) {
      return ["28%"];
    } else {
      return ["64%", "80%"];
    }
  }, []);
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

  const submitPreRegistration = () => {
    const weightNum = Number(weight);
    let valid = true;

    if (isNaN(weightNum) || weightNum <= 49) {
      setWeightValid(false);
      valid = false;
    } else {
      setWeightValid(true);
    }

    if (age <= 18) {
      setValidAge(false);
      valid = false;
    } else {
      setValidAge(true);
    }

    if (!valid) return;

    setSubmitSuccess(true);
    const donation_data = {
      donor: user?.id,
      recipient: props?.drive_id,
      units_donated: 1,
      schedule_date: props?.date,
      drive_donation: true,
    };

    InsertDoation(donation_data);

    if (error) {
      console.error("Donation Insertion Error:", error);
      return;
    }

    setTimeout(() => {
      ref.current?.close();
      setSubmitSuccess(false);
      setCondition(false);
      setWeight("");
    }, 1700);
  };

  const renderCustomHandle = () => (
    <View className="py-4 rounded-t-lg">
      <Text className="text-center text-xl font-bold">Pre-Registration</Text>
    </View>
  );

  return (
    <BottomSheetModal
      ref={ref}
      index={1}
      snapPoints={snapPoints}
      handleComponent={renderCustomHandle}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView>
        <View className="w-full px-4">
          {isSubmitSuccess ? (
            <Animatable.View
              animation="bounceIn"
              duration={500}
              easing={"ease-in"}
              className="my-14 justify-center items-center"
            >
              <Image
                source={require("../../../../assets/icon/check.png")}
                resizeMode="contain"
                className="h-[120px]"
              />
              <Text className="font-bold text-xl text-[#4CAF50]">
                Registration Success
              </Text>
            </Animatable.View>
          ) : isDrivePending ? (
            <View
              animation="bounceIn"
              duration={500}
              easing={"ease-in"}
              className="my-14 justify-center items-center"
            >
              <Image
                source={require("../../../../assets/icon/check.png")}
                resizeMode="contain"
                className="h-[120px]"
              />
              <Text className="font-bold text-xl text-center text-[#4CAF50]">
                You're already registered for this upcoming donation drive.
              </Text>
            </View>
          ) : (
            <View>
              <View className="bg-slate-100 rounded-xl py-5 px-4">
                <Text className="text-center font-bold text-lg text-primary_gray">
                  {props?.title}
                </Text>
                <Text className="text-center text-primary_gray">{`${DayAndDate(
                  props?.date
                )} ${props?.time}`}</Text>
              </View>
              <View>
                <InputBox
                  detail={
                    <Text className="text-center font-bold text-base">
                      What is your current weight in kilograms (Kg)?
                    </Text>
                  }
                  keyboardType="numeric"
                  title="0 Kg"
                  onChangeText={(val) => setWeight(val)}
                />
              </View>
              {!isWeightValid && (
                <Text className="text-primary_red font-bold text-center mt-2">
                  You must weigh at least 50 kg to be eligible for donation.
                </Text>
              )}
              {!isAgeValid && (
                <View>
                  <Text className="text-primary_red font-bold text-center mt-2">
                    You must be at least 18 years old to be eligible for blood
                    donations.
                  </Text>
                  <Pressable>
                    <Text className="text-center pt-4 font-extrabold text-primary_red">
                      How to be eligible?
                    </Text>
                  </Pressable>
                </View>
              )}
              <View className="flex-row px-4 pt-10">
                <Pressable
                  className={`w-5 h-5 border mt-1 mr-2 justify-center items-center ${
                    condition ? "bg-[#F42F47]" : "bg-transparent"
                  }`}
                  onPress={() => setCondition(!condition)}
                >
                  {condition && (
                    <MaterialCommunityIcons
                      name="check-bold"
                      size={12}
                      color="white"
                    />
                  )}
                </Pressable>
                <Text>
                  I acknowledge my commitment to the donation process and
                  certify that all the details I have provided are genuine and
                  not misleading.
                </Text>
              </View>
              <ThemeButton
                title="Submit"
                onPress={submitPreRegistration}
                disable={!condition || isDrivePending}
              />
            </View>
          )}
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default PreRegister;
