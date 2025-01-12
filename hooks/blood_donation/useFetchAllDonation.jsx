import { useState } from "react";
import { supabase } from "../../lib/supabase";

const UseFetchAllDonation = (recent_donation) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [donationData, setDonationData] = useState(null);

  const FetchDonation = async () => {
    setLoading(true);
    try {
      let query = supabase.from("blood_donation").select("*");

      const { data, error } = await query;

      if (error) {
        setError(error.message);
      } else {
        setDonationData(data);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { donationData, error, loading, FetchDonation };
};

export default UseFetchAllDonation;
