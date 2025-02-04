import { Pressable, StyleSheet, Text, View, Modal, Image } from "react-native";
import React, { useEffect } from "react";
import { getUserImageSrc } from "../../services/imageServices";
import UseFetchDonationCount from "../../hooks/blood_donation/fetchUnitDonated";
import QRCode from "react-native-qrcode-svg";
const ModalDonorCard = ({ visible, onRequestClose, user }) => {
  const { totalUnitDonated, FetchUnitCount } = UseFetchDonationCount();

  useEffect(() => {
    FetchUnitCount(user?.id);
  }, [user]);
  return (
    <View>
      <Modal
        transparent={true}
        visible={visible}
        animationType="fade"
        onRequestClose={onRequestClose}
      >
        <Pressable
          className="flex-1 justify-center items-center bg-black/50 px-4"
          onPress={onRequestClose}
        >
          <Pressable
            className="w-full bg-primary_red rounded-3xl"
            onPress={(e) => e.stopPropagation()}
          >
            <View className="w-full flex items-center justify-center py-10 ">
              <Image
                className="border border-white w-28 h-28 rounded-full"
                source={getUserImageSrc(user?.image)}
                resizeMethod="retain"
              />
              <Text className="text-white font-bold text-3xl pt-2">
                {user?.first_name} {user?.last_name}
              </Text>
            </View>

            <View className="w-full flex-row justify-evenly">
              <View className="">
                <Text className="text-lg text-white font-bold">BLOOD TYPE</Text>
                <Text className="text-center font-bold text-3xl text-white">
                  {user?.blood_type}
                </Text>
              </View>
              <View className="">
                <Text className="text-lg text-white font-bold">DONATION</Text>
                <View className="flex-row justify-center">
                  <Text className="text-center font-bold text-3xl text-white">
                    {totalUnitDonated}
                  </Text>
                  <Text className="text-base text-white">Units</Text>
                </View>
              </View>
            </View>

            <View className="bg-white mx-auto p-10 rounded-3xl mt-5">
              <QRCode
                value={String(user?.id)}
                size={180}
                color="black"
                backgroundColor="white"
              />
            </View>
            <Text className="text-center font-bold text-white text-xl py-5">
              BLOODLINK
            </Text>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default ModalDonorCard;

const styles = StyleSheet.create({});
