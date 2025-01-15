import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { supabase } from "../../lib/supabase";

const UseFetchDonationCount = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalUnitDonated, setTotalUnitDonated] = useState(0);

  const FetchUnitCount = async (user_id) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("blood_donation")
        .select("units_donated")
        .eq("donor", user_id)
        .eq("status", "complete");

      if (error) {
        setError(error.message);
      } else {
        const total = data.reduce(
          (sum, item) => sum + (item.units_donated || 0),
          0
        );
        setTotalUnitDonated(total);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { totalUnitDonated, error, loading, FetchUnitCount };
};

export default UseFetchDonationCount;
