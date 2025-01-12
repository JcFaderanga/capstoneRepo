import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Pressable,
  RefreshControl,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { router } from "expo-router";
import { useAuth } from "../../context/authContext";
import ThemeContainer from "../../components/UI/themeContainer";
import ThemeButton from "../../components/UI/button/themeButton";
import { ToTitleCase } from "../../constant/textFormat";
import { ProfileInfo } from "../../components/profile__tab";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import UseFetchDonationCount from "../../hooks/blood_donation/fetchUnitDonated";
import UseFetchNextDonation from "../../hooks/blood_donation/fetchNextDonationDays";
import ContentTitleButton from "../../components/contentTitle";
import { supabase } from "../../lib/supabase";
import UseFetchDonation from "../../hooks/blood_donation/fetchDonation";
import { TimeToGo, LongDateFormat } from "../../constant/timeStamp";
import * as Animatable from "react-native-animatable";
import { useRouter } from "expo-router";

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useAuth();
  const { totalUnitDonated, FetchUnitCount } = UseFetchDonationCount();
  const { nextDonation, error, FetchNextDonation } = UseFetchNextDonation();
  const { donationData, loading, FetchDonation } = UseFetchDonation(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const bottomSheetRef = useRef(null);
  const modalRef = useRef(null);

  const snapPoints = useMemo(() => {
    if (donationData) {
      return ["28%", "95%"];
    }
    return ["33%", "95%"];
  }, [donationData]);

  const modalSnapPoints = useMemo(
    () => {
      if (user?.admin) {
        ["35%"];
      }
    },
    ["20%"],
    []
  );

  useEffect(() => {
    if (user) {
      FetchUnitCount(user?.id);
      FetchNextDonation(user?.id);
      FetchDonation(user?.id);
    }
  }, [user]);
  const onRefresh = async () => {
    setIsRefreshing(true);
    setTimeout(() => {
      FetchUnitCount(user?.id);
      FetchNextDonation(user?.id);
      FetchDonation(user?.id);
      setIsRefreshing(false);
    }, 1000);
  };
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) return;
      setTimeout(() => {
        router.replace(".././");
      }, 100);
    } catch (err) {
      console.error("Unexpected error during logout:", err);
    }
  };

  const openModalSheet = useCallback(() => {
    modalRef.current?.present();
  }, []);

  const renderCustomHandle = () => (
    <View className="px-2 py-1 rounded-t-lg">
      <Text className="text-center text-xl font-bold"></Text>
    </View>
  );

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop pressBehavior="collapse" {...props} />,
    []
  );

  const modalBackDrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );

  const handleEdit = () => {
    router.push("../pages/profile__tab/editProfile");
    modalRef.current?.close();
  };

  if (!user) {
    return (
      <ThemeContainer bgColor="white">
        <Text className="text-center mt-10">Loading user data...</Text>
      </ThemeContainer>
    );
  }

  return (
    <ThemeContainer bgColor={"white"}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              colors={["#F42F47"]} // Change the color of the refresh indicator
            />
          }
        >
          <View className="w-full h-[40px] flex-row justify-between items-center bg-primary_red ">
            <View className="px-4">
              <Text className="text-white font-bold">
                Blood Group: {user?.blood_type}
              </Text>
            </View>
            <TouchableOpacity
              onPress={openModalSheet}
              className="pr-5 h-full justify-center items-center flex-row"
            >
              <Image
                className="w-6 h-5 ml-4"
                style={{ tintColor: "white" }}
                source={require("../../assets/icon/menu.png")}
              />
            </TouchableOpacity>
          </View>
          <ProfileInfo unit={totalUnitDonated} nextDonation={nextDonation} />
          <UpComingDonation upComingDonation={donationData} />
        </ScrollView>
        <BottomSheet
          index={0}
          snapPoints={snapPoints}
          handleComponent={renderCustomHandle}
          backdropComponent={renderBackdrop}
        >
          <BottomSheetView>
            <FeatureBox
              icon={require("../../assets/icon/mediumStock.png")}
              title={"Blood Bank"}
              description={"Explore available blood types and inventory."}
              onPress={() => router.push("../pages/bloodBank")}
            />
            <FeatureBox
              icon={require("../../assets/icon/target.png")}
              title={"Donation Drive"}
              description={"Explore available blood types and inventory."}
              onPress={() => router.push("../pages/donationDrive")}
            />

            <FeatureBox
              icon={require("../../assets/icon/settings.png")}
              title={"Donation Settings"}
              description={"Manage your donation preferences."}
              tintColor={"#F42F47"}
              onPress={() => router.push("../pages/donationSettings")}
            />
            <FeatureBox
              icon={require("../../assets/icon/clock.png")}
              title={"Donation History"}
              description={"View your past donations and their impact."}
              tintColor={"#F42F47"}
              onPress={() => router.push("../pages/donationHistory")}
            />
            <FeatureBox
              icon={require("../../assets/icon/FAQs.png")}
              title={"FAQs"}
              description={
                "Find answers to common questions about blood donation."
              }
              tintColor={"#F42F47"}
              onPress={() => router.push("../pages/FAQs")}
            />
          </BottomSheetView>
        </BottomSheet>
        <BottomSheetModal
          ref={modalRef}
          snapPoints={modalSnapPoints}
          backdropComponent={modalBackDrop}
        >
          <BottomSheetView>
            <ContentTitleButton
              title={"Edit"}
              size={{ width: 22, height: 22 }}
              icon={require("../../assets/icon/edit.png")}
              onPress={handleEdit}
            />
            {user?.admin ? (
              <ContentTitleButton
                title={"Switch to admin"}
                size={{ width: 25, height: 25 }}
                icon={require("../../assets/icon/switch.png")}
              />
            ) : null}

            <ContentTitleButton
              title={"Log out"}
              size={{ width: 22, height: 22 }}
              icon={require("../../assets/icon/logout.png")}
              onPress={handleLogout}
            />
          </BottomSheetView>
        </BottomSheetModal>
      </GestureHandlerRootView>
    </ThemeContainer>
  );
};

const FeatureBox = ({ icon, title, description, tintColor, onPress }) => {
  return (
    <View className="w-full px-5">
      <Pressable
        onPress={onPress}
        className="w-full h-28 bg-slate-100 rounded-3xl px-6 mb-4 flex-row items-center"
      >
        <Image
          source={icon}
          className="w-9 h-12 mr-4"
          resizeMode="contain"
          tintColor={tintColor}
        />
        <View className="flex-1">
          <Text className="font-bold text-lg">{title}</Text>
          <Text>{description}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const UpComingDonation = ({ upComingDonation }) => {
  const router = useRouter();

  //console.log(upComingDonation?.schedule_date)

  const handleReviewAppointment = () => {
    router.push({
      pathname: "../pages/donationReview",
      params: { donation_details: JSON.stringify(upComingDonation) },
    });
  };
  const setDonation = () => {
    router.push("../pages/setDonation");
  };

  if (!upComingDonation) {
    return (
      <View className="mt-16 w-full px-4">
        <View className="w-full rounded-sm ">
          <Text className="font-bold text-xl text-center">
            Make a Life-Saving Contribution
          </Text>
          <View className="w-full my-2 rounded-2xl border border-stone-50">
            <View className="mx-4 mb-3 rounded-xl p-3 px-3">
              <Text className="text-center text-gray-500">
                Every donation has the potential to save multiple lives. Be a
                part of it!
              </Text>
            </View>
            <Pressable
              className="bg-primary_red mx-4 mb-7 rounded-xl py-4"
              onPress={setDonation}
            >
              <Text className="text-center text-white font-bold">
                Set Up Your Donation
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }
  return (
    <Animatable.View
      animation="zoomIn"
      duration={100}
      easing={"ease-in-out"}
      delay={100}
      className="mt-[50px] w-full px-5 "
    >
      <View className="w-full rounded-sm ">
        <Text className="font-bold text-xl text-center">
          Upcoming Appointment
        </Text>
        <View className="w-full my-2 rounded-2xl border border-stone-50">
          <View className="w-full flex-row items-center justify-center py-2">
            <Image
              source={require("../../assets/icon/appointment.png")}
              resizeMode="contain"
              className="w-6 h-7 mr-2"
            />
            <Text className="font-bold text-lg">
              {LongDateFormat(new Date(upComingDonation?.schedule_date))}
            </Text>
            <Text className="font-bold text-lg">
              {" "}
              - {TimeToGo(upComingDonation?.schedule_date)}
            </Text>
          </View>
          <View className=" mx-4 mb-3 rounded-xl py-5 px-3">
            <Text className="text-center text-gray-500">
              Red Cross Center Centennial Lane, Filinvest Corporate City,
              Alabang, Muntinlupa
            </Text>
          </View>
          <Pressable
            className="bg-primary_red mx-4 mb-7 rounded-xl py-4"
            onPress={handleReviewAppointment}
          >
            <Text className="text-center text-white font-bold">
              View Appointment
            </Text>
          </Pressable>
        </View>
      </View>
    </Animatable.View>
  );
};

export default Home;
