import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Animatable from "react-native-animatable";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ToTitleCase } from "../../constant/textFormat";
import useFetchAllRequest from "../../hooks/my_request_hooks/useFetchAllRequest";
import { getUserImageSrc } from "../../services/imageServices";
const DonorBox = ({ user_id, donor, index, onPress }) => {
  const [isPressed, setIsPressed] = useState(false);
  const { allRequest, error, loading, fetchAllRequest } = useFetchAllRequest();

  useEffect(() => {
    if (user_id) {
      fetchAllRequest(user_id); // Fetch all requests for the given user ID
    }
  }, [user_id, donor]);

  // Check if there’s any pending request for the given user
  const isDonrPending = allRequest
    ? allRequest.some(
        (request) =>
          request.user_id === user_id &&
          request.requested_to === donor?.id &&
          request.request_status === "pending"
      )
    : false;

  const profile = {
    Male: require("../../assets/icon/maleProfile.png"),
    Female: require("../../assets/icon/femaleProfile.png"),
  };

  if (donor) {
    var { id, first_name, last_name, blood_type, anonymous_donor, gender } =
      donor;
  }

  return (
    <Animatable.View
      className="w-full h-[100px] flex justify-center items-center border-t-2 border-slate-100 "
      animation="zoomIn"
      duration={200}
      easing={"ease-in-out"}
      delay={index * 10}
    >
      <TouchableOpacity
        onPress={() => {
          if (isDonrPending) {
            console.log("There is an active request for this donor.");
            Alert.alert(
              "Request Already Sent",
              "You have already sent a request to this donor. Please wait for their response."
            );
          } else {
            console.log("No active request. Proceeding...");
            onPress && onPress(); // Call the onPress prop if defined
          }
        }}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        className="h-full flex items-center justify-center"
        style={{ backgroundColor: isPressed ? "#d1d5db" : "white" }}
      >
        <View className="w-full h-14 pl-2 pr-4 flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Image
              source={
                anonymous_donor
                  ? require("../../assets/icon/anonymouseIcon.png")
                  : donor?.image
                  ? getUserImageSrc(donor?.image)
                  : profile[gender]
              }
              className="w-12 h-12 rounded-full mx-3"
            />
            <View>
              <Text className="text-lg h-7 font-bold">
                {anonymous_donor
                  ? "Anonymous"
                  : ToTitleCase(`${first_name} ${last_name}`)}
              </Text>
              <Text className="text-lg leading-[16px] ">
                Blood Type:
                <Text className="text-primary_red font-bold">
                  {" "}
                  {blood_type}
                </Text>
              </Text>
            </View>
          </View>
          <Ionicons name="arrow-forward-sharp" size={24} color="#F42F47" />
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default DonorBox;

const styles = StyleSheet.create({});
