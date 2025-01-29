import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import useFetchUser from "../../../hooks/user/useFetchUser";
import DonationBox from "../donationBox";
import * as Animatable from "react-native-animatable";
const DonationRecipient = ({ item, onPress, index }) => {
  const { user: donationRecipient, loading, fetchUser } = useFetchUser();

  // if (!donationRecipient) return null;
  // const { first_name, last_name, blood_type } = donationRecipient;

  useEffect(() => {
    fetchUser(item?.recipient);
  }, [item]);

  const recipient = item?.anonymous_donation
    ? "Anonymous"
    : `${donationRecipient?.first_name} ${donationRecipient?.last_name}`;

  return (
    <>
      {loading ? (
        ""
      ) : (
        <Animatable.View
          className="my-1 bg-white"
          animation="zoomIn"
          duration={100}
          easing={"ease-in-out"}
          delay={index * 100}
          interationCount="infinity"
        >
          <DonationBox
            recipient={recipient}
            units_donated={item?.units_donated}
            schedule_date={item?.schedule_date}
            donation_status={item?.status}
            blood_type={donationRecipient?.blood_type}
            onPress={onPress}
          />
        </Animatable.View>
      )}
    </>
  );
};

export default DonationRecipient;

const styles = StyleSheet.create({});
