import { useState } from "react";
import { supabase } from "../../lib/supabase";

const useFetchNotification = () => {
  const [notification, setNotification] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Changed from null to false

  const fetchNotification = async (user_id) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("notification")
        .select(`*, profile(first_name, last_name, blood_type)`)
        .or(`receiver_id.eq.${user_id},receiver_id.eq.0`)
        .order("created_at", { ascending: false }); // Fetch both conditions

      if (error) {
        setError(error.message);
        throw error;
      }
      setNotification(data);
    } catch (e) {
      setError(e.message); // Ensures error messages are properly stored
    }
    setLoading(false);
  };

  return { notification, error, loading, fetchNotification };
};

export default useFetchNotification;
