import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useFetchSelectedDrive } from "../../../hooks/donation_drive";
import DonationBox from "../donationBox";
import * as Animatable from "react-native-animatable";
const DonationDrive = ({ item, onPress, index }) => {
  const { donationDrive, loading, fetchSelectedDrive } =
    useFetchSelectedDrive();
  useEffect(() => {
    fetchSelectedDrive(item?.recipient);
  }, [item]);

  return (
    <>
      {loading ? (
        ""
      ) : (
        <Animatable.View
          className="my-1 bg-white"
          animation="zoomIn"
          duration={200}
          easing={"ease-in-out"}
          delay={index * 100}
          interationCount="infinity"
        >
          <DonationBox
            recipient={donationDrive?.title}
            units_donated={item?.units_donated}
            schedule_date={item?.schedule_date}
            donation_status={item?.status}
            onPress={onPress}
          />
        </Animatable.View>
      )}
    </>
  );
};
export default DonationDrive;

const styles = StyleSheet.create({});
