import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { supabase } from "../../lib/supabase";
import useCreateNotification from "../notification/useCreateNotification";
const useInsertDonationDrive = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { insertNotif } = useCreateNotification();
  const InsertDonationDrive = async (data) => {
    console.info("data", data);
    setLoading(true);
    try {
      const { error, data: drive } = await supabase
        .from("donation_drive")
        .insert(data)
        .select()
        .single();
      if (error) console.log(error);
      console.info("donation drive posted successfully");
      insertNotif({
        receiver_id: 0,
        data: drive,
        notification_type: "donation_drive",
      });
    } catch (e) {
      setError(e);
    }

    setLoading(false);
  };

  return { error, loading, InsertDonationDrive };
};

export default useInsertDonationDrive;
