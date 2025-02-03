import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

const useFetchVerification = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [verificationData, setVerificationData] = useState(null);

  const FetchVerification = async (userId) => {
    setLoading(true);
    try {
      const { data: fetchData, error: fetchError } = await supabase
        .from("verification")
        .select("*")
        .eq("id", userId)
        .single();

      if (fetchError) {
        setError(fetchError);
        throw fetchError;
      }

      setVerificationData(fetchData);
    } catch (e) {
      console.error("Error fetching verification", e);
      setError("An error occurred while fetching the data.");
    } finally {
      setLoading(false);
    }
  };

  return { verificationData, error, loading, FetchVerification };
};

export default useFetchVerification;
