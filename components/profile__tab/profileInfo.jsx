import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import Elevated from "../elevated";
import { ToTitleCase } from "../../constant/textFormat";
const _layout = () => {
  return (
    <AuthProvider>
      <ProfileInfo />
    </AuthProvider>
  );
};

const ProfileInfo = ({ setProfile, unit, nextDonation }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [showId, setShowId] = useState(false);

  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const formatDate = (timestamp) => {
    // Check if timestamp is valid
    if (!timestamp || isNaN(new Date(timestamp).getTime())) {
      return "Invalid date";
    }
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "long" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const userCreatedAt = user?.created_at;
  const formattedDate = formatDate(userCreatedAt);

  const profile = {
    Male: require("../../assets/icon/maleProfile.png"),
    Female: require("../../assets/icon/femaleProfile.png"),
  };
  const userFullName = `${user.first_name} ${user.last_name}`;
  return (
    <>
      <View className="w-full flex bg-primary_red h-52 rounded-b-2xl ">
        {loading ? (
          <View className="h-[130px] justify-center items-center">
            <ActivityIndicator size="large" color="white" />
          </View>
        ) : (
          <View className=" h-[130px] flex-row items-center justify-center ">
            <View className="">
              <Image
                source={profile[user?.gender]}
                style={styles.profileImage}
                className="border"
                resizeMethod="retain"
              />
              {/* <Pressable
                style={{ elevation: 5 }}
                className="w-8 h-8 rounded-full bg-white absolute bottom-0 right-1 flex items-center justify-center"
                onPress={setProfile}
              >
                <Image
                  source={require("../../assets/icon/editPen.png")}
                  resizeMode="contain"
                  className="w-4"
                  style={{ elevation: 5, tintColor: "#3A3A3A" }}
                />
              </Pressable> */}
            </View>
            <View className="float-left h-full ml-2 justify-center">
              <Text className="float-left text-2xl font-bold text-white">
                {user && user.first_name && user.last_name
                  ? ToTitleCase(userFullName)
                  : ""}
              </Text>

              <Text className="float-left text-sm font-bold text-white">
                ID: {user?.id || ""}
              </Text>
            </View>
          </View>
        )}

        <View className="w-full mx-auto mt-[-10px]">
          <Elevated width={"100%"} height={80} radius={0} elevated={2}>
            <View className="flex-row h-full ">
              <View className="flex-1 justify-center items-center ">
                <Text className="text-sm font-bold">Unit Donated</Text>
                <View className="flex-row items-center ">
                  <Text className="font-bold text-[20px]">
                    {unit === 0 ? "--" : unit}
                  </Text>
                </View>
              </View>
              <View className="flex-1 justify-center items-center ">
                <Text className="text-sm font-bold">Next Donation</Text>
                <View className="flex-row items-center">
                  <Text className="font-bold text-[20px]">{nextDonation}</Text>
                </View>
              </View>
            </View>
          </Elevated>
        </View>
      </View>
    </>
  );
};

export default ProfileInfo;
const styles = StyleSheet.create({
  profileImage: {
    width: 70,
    height: 70,
    borderColor: "white",
    // borderWidth: 1,
    borderRadius: 99,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 20, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 10, // For a rounded image
  },
});
