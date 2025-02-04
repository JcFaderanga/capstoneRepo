import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Pressable,
  RefreshControl,
  Dimensions,
  Linking,
} from "react-native";
import appVersion from "../../app.json";
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
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
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
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import {
  getUserImageSrc,
  uploadFile,
  getSupabaseFileUrl,
} from "../../services/imageServices";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useFetchUser from "../../hooks/user/useFetchUser";
import ModalDonorCard from "../../components/Modals/modalDonorCard";
const Home = () => {
  const [isModalDonorCard, setModalDonorCard] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const { user, setUserData } = useAuth();
  const { totalUnitDonated, FetchUnitCount } = UseFetchDonationCount();
  const { nextDonation, error, FetchNextDonation } = UseFetchNextDonation();
  const { donationData, loading, FetchDonation } = UseFetchDonation({
    recentDonation: true,
    activeSched: true,
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const bottomSheetRef = useRef(null);
  const modalRef = useRef(null);
  const { user: currentUser, fetchUser } = useFetchUser();
  //get screen height
  const screenHeight = Dimensions.get("window").height;
  const calcHeight = (h) => h * screenHeight;
  const snapPoints = useMemo(() => {
    if (donationData) {
      return [calcHeight(0.25), calcHeight(0.9)];
    }
    return [calcHeight(0.33), calcHeight(0.9)];
  }, [donationData]);

  const modalSnapPoints = useMemo(
    () => {
      if (user?.super_user) {
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
      fetchUser(user?.id);
    }
  }, [user]);
  const onRefresh = async () => {
    setIsRefreshing(true);
    fetchUser(user?.id);
    FetchDonation(user?.id);
    setTimeout(() => {
      FetchUnitCount(user?.id);
      FetchNextDonation(user?.id);
      setIsRefreshing(false);
    }, 1000);
  };

  const handleLogout = async () => {
    //
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        AsyncStorage.clear().then(() => console.log("Storage cleared!"));
        console.log(error);
        return;
      }

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

  const onModalRefClose = () => {
    return modalRef.current?.close();
  };
  const handleEdit = () => {
    router.push("../pages/profile__tab/editProfile");
    onModalRefClose();
  };
  const handleWebViewAdmin = () => {
    router.push("../pages/webViewAdmin");
    onModalRefClose();
  };
  const handlePrescreening = () => {
    router.push("../pages/prescreening2");
    onModalRefClose();
  };

  const setProfile = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri); // Temporarily show selected image while uploading

      // Upload the image to Supabase
      const uploadResult = await uploadFile(
        "profileImages",
        result.assets[0].uri
      );
      if (uploadResult.success) {
        // Update user profile image path in Supabase
        const { error } = await supabase
          .from("profile")
          .update({ image: uploadResult.data.path })
          .eq("id", user.id);

        if (!error) {
          setUserData({
            ...user,
            image: uploadResult.data.path,
          });
        } else {
          console.log("Error updating profile:", error);
        }
      } else {
        console.log(uploadResult.msg);
      }
    }
  };

  //console.log(" profileImage.uri", profileImage);
  let imageSource =
    profileImage && typeof profileImage == "object"
      ? profileImage.uri
      : getUserImageSrc(user?.image, user?.GestureHandlerRootView);
  // console.log("imageSource", imageSource);

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
        <ModalDonorCard
          user={user}
          visible={isModalDonorCard}
          onRequestClose={() => setModalDonorCard(false)}
        />
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
                Blood Group: {user?.blood_type}{" "}
                {currentUser?.verified ? `(Verified)` : `(Unverified)`}
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
          <ProfileInfo
            unit={totalUnitDonated}
            nextDonation={nextDonation}
            _profile={imageSource}
            onPress={setProfile}
          />
          {loading ? (
            <View className="mt-10 p-4 flex items-center justify-center">
              <ActivityIndicator size={30} color={"red"} />
              <Text>Fetching Update...</Text>
            </View>
          ) : (
            <UpComingDonation upComingDonation={donationData} />
          )}
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
            <Text className="text-center font-bold opacity-10">
              App Version {appVersion.expo.version}
            </Text>
          </BottomSheetView>
        </BottomSheet>
        <BottomSheetModal
          ref={modalRef}
          snapPoints={modalSnapPoints}
          backdropComponent={modalBackDrop}
        >
          <BottomSheetView>
            <TouchableOpacity
              className=" flex-row items-center w-full h-20 border-b-2 border-[#F2F2F2] px-5"
              onPress={handleEdit}
            >
              <Feather name="edit" size={24} color="black" />
              <Text className="font-bold text-lg ml-5">Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className=" flex-row items-center w-full h-20 border-b-2 border-[#F2F2F2] px-5"
              onPress={() => {
                setModalDonorCard(true);
                modalRef.current?.close();
              }}
            >
              <AntDesign name="idcard" size={25} color="black" />
              <Text className="font-bold text-lg ml-5">Donor card</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className=" flex-row items-center w-full h-20 border-b-2 border-[#F2F2F2] px-5"
              onPress={handlePrescreening}
            >
              <FontAwesome5 name="clipboard" size={25} color="black" />
              <Text className="font-bold text-lg ml-5">Pre-Screening</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className=" flex-row items-center w-full h-20 border-b-2 border-[#F2F2F2] px-5"
              onPress={handleLogout}
            >
              <MaterialIcons name="logout" size={24} color="black" />
              <Text className="font-bold text-lg ml-5">Log out</Text>
            </TouchableOpacity>

            {user?.super_user ? (
              <TouchableOpacity
                className=" flex-row items-center w-full h-20 border-b-2 border-[#F2F2F2] px-5"
                onPress={handleWebViewAdmin}
              >
                <FontAwesome6 name="arrows-rotate" size={24} color="black" />
                <Text className="font-bold text-lg ml-5">switch to admin</Text>
              </TouchableOpacity>
            ) : null}
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

  // router.push({
  //   pathname: "../pages/donationReview",
  //   params: { donation_details: JSON.stringify(upComingDonation) },
  // });
  const handleReviewAppointment = () => {
    router.push({
      pathname: "../pages/viewAppointment",
      params: { donation_details: JSON.stringify(upComingDonation) },
    });
    // router.push({
    //   pathname: "../pages/donationReview",
    //   params: { donation_details: JSON.stringify(upComingDonation) },
    // });
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
                Set Up Your Appointment
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
