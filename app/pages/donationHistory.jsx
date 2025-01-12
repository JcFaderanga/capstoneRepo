import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import UseFetchDonation from "../../hooks/blood_donation/fetchDonation";
import { useAuth } from "../../context/authContext";
import useFetchUser from "../../hooks/user/useFetchUser";
import { useRouter } from "expo-router";
import Elevated from "../../components/elevated";
import { router } from "expo-router";
const DonationHistory = () => {
  const { user } = useAuth();
  const { donationData, error, FetchDonation } = UseFetchDonation();

  console.log("donation data", donationData);
  //console.log("donation data error", error);

  useEffect(() => {
    FetchDonation(user?.id);
  }, [user]);

  return (
    <View className="h-full w-full bg-white ">
      {donationData?.length === 0 ? (
        <>
          <View className="mt-12 w-full px-4">
            <View className="w-full rounded-sm ">
              <Text className="font-bold text-xl text-center">
                Take your first step in donating
              </Text>
              <View className="w-full my-2 rounded-2xl border border-stone-50">
                <View className="mx-4 mb-3 rounded-xl p-3 px-3">
                  <Text className="text-center text-gray-500">
                    Every donation can save 3 lives.
                  </Text>
                </View>
                <Pressable
                  className="bg-primary_red mx-4 mb-7 rounded-xl py-4"
                  onPress={() => router.push("./setDonation")}
                >
                  <Text className="text-center text-white font-bold">
                    Set Up Your Donation
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </>
      ) : (
        <FlatList
          data={donationData || []}
          keyExtractor={(item) => item?.blood_donation_id?.toString()}
          renderItem={({ item }) => <DonationBox donationData={item} />}
        />
      )}
    </View>
  );
};
export default DonationHistory;

const DonationBox = ({ donationData }) => {
  const router = useRouter();
  const { user, fetchUser } = useFetchUser();
  useEffect(() => {
    fetchUser(donationData?.recipient);
  }, [donationData]);

  if (!user) return;
  const { first_name, last_name, blood_type } = user;
  const unitDonatedVolume = donationData.units_donated * 450;
  const recipient = donationData?.anonymous_donation
    ? "Anonymous"
    : `${first_name} ${last_name}`;

  // const statusImages = {
  //   complete: require("../../assets/icon/complete.png"),
  //   cancelled: require("../../assets/icon/cancelled.png"),
  //   pending: require("../../assets/icon/pending.png"),
  // };
  const statusTag = {
    complete: (
      <Text className="font-bold text-base pt-1 text-green-700"> Complete</Text>
    ),
    cancelled: (
      <Text className="font-bold text-base pt-1 text-red-700"> Cancelled</Text>
    ),
    pending: (
      <Text className="font-bold text-base pt-1 text-orange-400"> Pending</Text>
    ),
  };

  const formattedDate = (sched_date) => {
    const dateObj = new Date(sched_date);
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDonationReview = () => {
    router.push({
      pathname: "../pages/donationReview",
      params: { donation_details: JSON.stringify(donationData) },
    });
  };
  return (
    <Pressable className="px-3" onPress={handleDonationReview}>
      <Elevated width={"100%"} radius={5} elevated={2}>
        <View className=" w-full px-4 overflow-hidden">
          <View className="flex-row h-28">
            <View className=" flex justify-center">
              <Text className="font-bold text-lg">
                Recipient: <Text className="font-normal">{recipient}</Text>
              </Text>
              <Text className="font-bold text-base pt-1">
                Volume:{" "}
                <Text className="font-normal">
                  {donationData.units_donated}
                  {donationData.units_donated >= 1 ? "units" : "unit"} (
                  {unitDonatedVolume}ml)
                </Text>
              </Text>
              <View className="flex-row justify-between w-full">
                <Text className="font-bold text-base pt-1 ">
                  Schedule:{" "}
                  <Text className="font-normal">
                    {formattedDate(donationData.schedule_date)}
                  </Text>
                </Text>
                <Text className="font-bold text-base pt-1">
                  {statusTag[donationData?.status]}
                </Text>
              </View>
            </View>
            <View>
              {/* <Image
                source={statusImages[donationData?.status]}
                className="w-52 h-52 absolute top-[-60px] right-[-220px]"
                resizeMode="contain"
              /> */}
            </View>
          </View>
          <View className="flex-row justify-between items-center border-t-2 border-slate-100 p-3">
            <View className="flex-row items-center">
              <Image
                source={require("../../assets/icon/donated.png")}
                className="w-10 h-11 mr-3"
                resizeMode="contain"
              />
              <Text className="font-bold text-lg">Whole Blood</Text>
            </View>
            <Text className="font-bold text-2xl text-primary_red">
              {blood_type}
            </Text>
          </View>
        </View>
      </Elevated>
    </Pressable>
  );
};
