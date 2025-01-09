import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  forwardRef,
  useEffect,
} from "react";
import {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { TimeAgo, CalculateAge } from "../../../../../constant/timeStamp";
import * as Progress from "react-native-progress";
import * as Animatable from "react-native-animatable";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useAuth } from "../../../../../context/authContext";
import { ScrollView } from "react-native-gesture-handler";
import ModalPublicDonate from "../../../../../components/Modals/request__tab/foryou/publicDonate/ModalPublicDonate";
import PreSreening from "./components/PreScreening";
import UseFetchDonationCount from "../../../../../hooks/blood_donation/fetchDonationUnitCount";
import UseFetchNextDonation from "../../../../../hooks/blood_donation/fetchNextDonationDays";
import useFetchUser from "../../../../../hooks/user/useFetchUser";
import { ShowCompatibility } from "../../../../../hooks/blood_validation/useBloodCopatibilty";
const SheetViewRequest = forwardRef(({ request_data }, ref) => {
  const [isDonate, setDonate] = useState(false);
  const [isBloodCompatible, setBloodCompatible] = useState(null);
  const { user } = useAuth();
  const { nextDonation, FetchNextDonation } = UseFetchNextDonation();

  useEffect(() => {
    FetchNextDonation(user?.id);
  }, [user]);

  const donate = () => {
    snapeToIndex(1);
    setDonate(true);
  };

  const snapPoints = useMemo(() => ["75%", "96%"], []);
  const snapeToIndex = (index) => ref.current?.snapToIndex(index);
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
  const handleCloseSheet = (proceed) => {
    if (proceed) {
      return ref.current?.close();
    }
  };
  const onSheetChange = useCallback((index) => {
    if (index === -1) {
      setDonate(false);
    }
  }, []);

  const renderCustomHandle = () => (
    <View className="h-14 rounded-t-xl bg-primary_red  items-center flex-row justify-between px-4">
      {isDonate ? (
        <Pressable
          onPress={() => {
            setDonate(false);
            snapeToIndex(0);
          }}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </Pressable>
      ) : (
        <Text className="text-white">
          Posted {TimeAgo(request_data?.created_at)}
        </Text>
      )}
      <View className="flex-row ">
        <Image
          source={require("../../../../../assets/icon/dots.png")}
          resizeMode="contain"
          className="w-8"
        />
      </View>
    </View>
  );

  const [month, day, year] = nextDonation.split("/").map(Number);
  const parsedDate =
    nextDonation !== "--" ? new Date(year, month - 1, day) : new Date();
  const age = CalculateAge(user?.birth_date);

  useEffect(() => {
    const recipientBloodType = request_data?.blood_type || "";
    const donorBloodType = user?.blood_type || "";
    const donorTypes = ShowCompatibility(donorBloodType) || [];
    const canDonate = donorTypes.canDonateTo.includes(recipientBloodType);

    if (canDonate) {
      setBloodCompatible(true);
    } else if (!canDonate) {
      setBloodCompatible(false);
    }
  }, [isBloodCompatible, request_data]);

  const ModalDiaglog = () => {
    let message = "";
    if (!isBloodCompatible) {
      message = `Unfortunately, your blood type (${user?.blood_type}) is not compatible with the recipient's blood type. Please consider donating to someone with a compatible match.`;
    }
    if (new Date() < parsedDate.getTime()) {
      message = `"Your body needs time to replenish the blood cells and iron lost during your last donation. For whole blood, you must wait 8 weeks to ensure you're healthy and the donation is safe. Platelets and plasma recover faster, so you can donate sooner.`;
    }
    if (age <= 18) {
      message = `We're sorry, but you must be at least 18 years old to donate blood. Please consider contributing once you meet the age requirement.`;
    }
    Alert.alert("Why is this happening? ", message);
  };

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      handleComponent={renderCustomHandle}
      onChange={onSheetChange}
      className="bg-primary_red"
    >
      <BottomSheetView className="bg-primary_red h-full">
        {isDonate ? (
          <PreSreening onPress={handleCloseSheet} request_data={request_data} />
        ) : (
          <Preview
            request_data={request_data}
            isBloodCompatible={isBloodCompatible}
          />
        )}

        <Animatable.View
          animation="zoomIn"
          duration={200}
          easing={"ease-in-out"}
          delay={400}
        >
          {new Date() < parsedDate.getTime() ||
          age <= 18 ||
          !isBloodCompatible ? (
            <View>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Donate blood button"
                className="w-[310px] h-[50px] mx-auto rounded-2xl bg-white opacity-35 justify-center items-center shadow-md mt-4"
              >
                <Text className="text-white font-bold text-lg">
                  {age <= 18
                    ? `Age Under 18`
                    : !isBloodCompatible
                    ? `Not Compatible`
                    : `Next donation starting ${nextDonation}`}
                </Text>
              </TouchableOpacity>
              <Pressable onPress={ModalDiaglog}>
                <Text className="text-center py-2 text-white font-bold">
                  Why is this happening?
                </Text>
              </Pressable>
            </View>
          ) : (
            <TouchableOpacity
              style={isDonate ? { display: "none" } : {}}
              onPress={() => donate()}
              accessible={true}
              accessibilityLabel="Donate blood button"
              className="w-[310px] h-[50px] mx-auto rounded-2xl bg-white justify-center items-center shadow-md mt-4"
            >
              <Text className="text-primary_red font-bold text-xl">Donate</Text>
            </TouchableOpacity>
          )}
        </Animatable.View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});
export default SheetViewRequest;

{
  /* REQUEST STATUS*/
}
const RequestStatus = ({ request_data }) => {
  const { totalUnits, error, loading, FetchUnitCount } =
    UseFetchDonationCount();
  useEffect(() => {
    FetchUnitCount(request_data?.blood_request_id);
  }, []);
  const currentUnitLeft = request_data?.units - totalUnits;
  const currentPercent = totalUnits / request_data?.units;

  return (
    <Animatable.View
      animation="zoomIn"
      duration={200}
      easing={"ease-in-out"}
      delay={300}
    >
      <ImageBackground
        source={require("../../../../../assets/icon/handBG.png")}
        className="mx-auto w-[90%] rounded-3xl h-40 bg-[#F58694] mt-10 mb-5"
        resizeMode="cover"
      >
        <View className="flex-row h-full w-full items-center justify-evenly">
          <View className="w-32  h-32 rounded-full flex justify-center items-center">
            <Progress.Circle
              progress={currentPercent}
              size={110}
              borderWidth={0}
              color="#F42F47"
              thickness={9}
              showsText={true}
              formatText={() => request_data?.blood_type}
              textStyle={styles.progressText}
              unfilledColor="#E5E5E5"
              animated={true}
            />
          </View>
          <View>
            <Text className="text-white text-2xl font-bold ">Need</Text>
            <Text className="text-white text-5xl font-bold">
              {request_data?.units}
            </Text>
          </View>
          <View>
            <Text className="text-white text-2xl font-bold">Left</Text>
            <Text className="text-white text-5xl font-bold">
              {currentUnitLeft}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </Animatable.View>
  );
};

{
  /* PREVIEW PAGE*/
}
const Preview = ({ request_data, isBloodCompatible }) => {
  const { user, fetchUser } = useFetchUser();
  const { user: currentUser } = useAuth();
  useEffect(() => {
    fetchUser(request_data?.user_id);
  }, [request_data]);

  const profile = {
    Male: require("../../../../../assets/icon/maleProfile.png"),
    Female: require("../../../../../assets/icon/femaleProfile.png"),
  };
  return (
    <View className="bg-primary_red  ">
      <View className="w-full flex items-center pt-11 px-4">
        <Animatable.View
          animation="zoomIn"
          duration={200}
          easing={"ease-in-out"}
          delay={100}
        >
          <Image
            source={profile[user?.gender]}
            resizeMode="contain"
            className="h-32 w-32 rounded-full border-2 border-white"
          />
        </Animatable.View>
        <Animatable.Text
          animation="zoomIn"
          duration={200}
          easing={"ease-in-out"}
          delay={200}
          className="text-white px-4 text-base text-center font-bold mt-5"
        >
          Your blood type {currentUser?.blood_type}{" "}
          {isBloodCompatible ? "is" : "in not"} compatible with this patients
          having a {request_data?.blood_type} blood type.
        </Animatable.Text>
      </View>
      <RequestStatus request_data={request_data} />
    </View>
  );
};
const styles = StyleSheet.create({
  progressText: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },
});
