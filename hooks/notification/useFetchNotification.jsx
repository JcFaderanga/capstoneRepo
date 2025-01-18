import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { supabase } from "../../lib/supabase";
const useFetchNotification = () => {
  const [notification, setNotification] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const fetchNotification = async (user_id) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("notification")
        .select(
          `
            *,profile(
                first_name, last_name, blood_type
              )
            `
        )
        .eq("reciever_id", user_id);
      if (error) {
        setError(error.message);
        throw error();
      }
      setNotification(data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  return { notification, error, loading, fetchNotification };
};

export default useFetchNotification;
