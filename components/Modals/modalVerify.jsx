import {
  Modal,
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Animatable from "react-native-animatable";
import ThemeButton from "../UI/button/themeButton";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { pickDocument, pickImage, uploadFile } from "../../utils/fileUtils";
import Verification from "../../hooks/blood_validation/insertVerification";
import useFetchVerification from "../../hooks/blood_validation/useFetchVerification";
import { use } from "react";
const ModalVerify = ({ visible, onRequestClose, userId }) => {
  const [filePath, setFilePath] = useState(null);
  const [onSubmit, setOnSubmit] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { verificationData, error, loading, InsertVerification } =
    Verification();
  const { verificationData: fetchData, FetchVerification } =
    useFetchVerification();

  useEffect(() => {
    if (userId) {
      FetchVerification(userId);
    }
  }, [userId]);
  useEffect(() => {
    if (fetchData?.status === "pending") {
      setSubmitSuccess(true);
    }
  }, [fetchData]);

  const handleSubmit = async () => {
    setOnSubmit(true);
    const fileName = await uploadFile(
      "verification",
      filePath,
      filePath.mimeType
    );

    await InsertVerification({ id: userId, document: fileName });
    if (!error) {
      setFilePath(null);
      setSubmitSuccess(true);
    }
    setOnSubmit(false);
  };

  const handleUploadPDF = async () => {
    const file = await pickDocument();
    // console.log("file", file);

    // Check if there's an error
    if (file && file.error) {
      Alert.alert("Invalid File", file.error);
    } else {
      setFilePath(file); // Proceed if there's no error
    }
  };

  if (submitSuccess) {
    return (
      <View>
        <Modal
          transparent={true}
          visible={visible}
          animationType="fade"
          onRequestClose={onRequestClose}
        >
          <Pressable
            className="flex-1 justify-end  bg-black/30"
            onPress={onRequestClose}
          >
            <Pressable onPress={(e) => e.stopPropagation()}>
              <View className="bg-white px-2 py-10 rounded-t-3xl">
                <Text className="font-bold text-green-600 text-center text-xl">
                  File Submitted Successfully!
                </Text>
                <Text className="text-center py-4">
                  Please wait at least 24 to 48 hours to check your document.
                  You will be notified about the status shortly.
                </Text>
                <Text className="text-center font-bold">
                  Verification Id:{" "}
                  {verificationData?.verification_id ||
                    fetchData?.verification_id}
                </Text>
                <ThemeButton title={"Okay"} onPress={onRequestClose} />
              </View>
            </Pressable>
          </Pressable>
        </Modal>
      </View>
    );
  }

  return (
    <View>
      <Modal
        transparent={true}
        visible={visible}
        animationType="fade"
        onRequestClose={onRequestClose}
      >
        <Pressable
          className="flex-1 justify-end  bg-black/30"
          onPress={onRequestClose}
        >
          <Animatable.View
            className=" rounded-t-3xl  bg-white"
            animation="slideInUp"
            duration={100}
            easing={"ease-in-out"}
            delay={200}
          >
            <Pressable
              onPress={(e) => e.stopPropagation()}
              className="w-full  h-[85%]  px-4 "
            >
              <View className="py-5">
                <Text className="text-center font-bold text-base">
                  To ensure that your blood type is correct, we encourage you to
                  submit support documents stating your blood group to avoid any
                  inconvenience for yourself and the recipients of your
                  donation.
                </Text>
              </View>

              <View className=" w-full">
                <Text className="font-bold text-primary_red">
                  Example documents typically accepted as proof of blood type:
                </Text>
                <View className="my-2">
                  <Text className="font-bold">
                    Blood Donation Cards or Records
                  </Text>
                  <Text> - Red Cross Blood Donor Card</Text>
                  <Text> - Blood Bank Donor Card</Text>
                </View>
                <View className="my-2">
                  <Text className="font-bold">
                    Government-Issued IDs with Blood Type
                  </Text>
                  <Text> - Driver’s License (if blood type is indicated)</Text>
                  <Text> - PhilHealth ID (if blood type is indicated)</Text>
                  <Text>
                    {" "}
                    - Military ID or PNP ID (for uniformed personnel)
                  </Text>
                </View>
                <View className="my-2">
                  <Text className="font-bold">
                    Medical Records or Certificates
                  </Text>
                  <Text>
                    {" "}
                    - Blood Typing Certificate (issued by a hospital, clinic, or
                    blood bank)
                  </Text>
                  <Text>
                    {" "}
                    - Medical Certificate from a Licensed Physician (indicating
                    blood type)
                  </Text>
                  <Text>
                    {" "}
                    - Hospital Records (e.g., laboratory test results, discharge
                    summary, or patient chart)
                  </Text>
                </View>
                <TouchableOpacity
                  className="w-full h-14 border border-[#DCDCDC] flex-row items-center justify-center px-4 mt-4 rounded-xl bg-gray-100"
                  onPress={handleUploadPDF}
                >
                  {filePath ? (
                    <Text className="mx-2 text-nowrap">{filePath.name}</Text>
                  ) : (
                    <>
                      <FontAwesome6 name="add" size={18} color="black" />
                      <Text className="mx-2 text-nowrap">Attach file here</Text>
                    </>
                  )}
                </TouchableOpacity>
                <ThemeButton
                  title={"Submit"}
                  onPress={handleSubmit}
                  isLoading={onSubmit}
                  disable={loading ? true : false}
                />
              </View>
            </Pressable>
          </Animatable.View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default ModalVerify;

const styles = StyleSheet.create({});
