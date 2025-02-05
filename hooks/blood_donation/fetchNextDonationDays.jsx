import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { supabase } from "../../lib/supabase";

const UseFetchNextDonation = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nextDonation, setNextDonation] = useState("--");

  const FetchNextDonation = async (donor_id) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("blood_donation")
        .select("time_completed")
        .eq("donor", donor_id)
        .eq("status", "complete")
        .order("time_completed", { ascending: false })
        .limit(1);

      if (error) {
        setError(error.message);
      } else {
        if (data.length > 0) {
          // Get the most recent donation date

          const lastDonationDate = new Date(data[0].time_completed);

          // Add 56 days to the last donation date to get the next donation date
          const nextDonation = new Date(lastDonationDate);
          nextDonation.setDate(lastDonationDate.getDate() + 56); // Add 56 days
          console.log("lastDonationDate", lastDonationDate);
          // Format the next donation date
          const formattedDate = nextDonation.toLocaleDateString(); // Format the date to a readable format

          setNextDonation(formattedDate);
        } else {
          setNextDonation("--"); // No donation history found, display '--'
        }
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { nextDonation, error, loading, FetchNextDonation };
};

export default UseFetchNextDonation;
