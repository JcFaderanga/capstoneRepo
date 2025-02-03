import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { supabase } from "../../lib/supabase";
const Verification = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [verificationData, setVerificationData] = useState(null);

  const InsertVerification = async (inputDoc) => {
    setLoading(true);
    try {
      const { data: insertData, error: insertError } = await supabase
        .from("verification")
        .insert(inputDoc)
        .select()
        .single();

      if (insertError) {
        setError(insertError);
        throw insertError;
      }
      // Insert Notification if needed
      setVerificationData(insertData);
    } catch (e) {
      console.error("error", e);
    } finally {
      setLoading(false);
    }
  };

  return { verificationData, error, loading, InsertVerification };
};

export default Verification;
