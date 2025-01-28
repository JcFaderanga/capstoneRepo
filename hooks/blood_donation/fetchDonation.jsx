import { useState } from "react";
import { supabase } from "../../lib/supabase";

const UseFetchDonation = ({ recentDonation = false, activeSched = false }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [donationData, setDonationData] = useState(null);

  const FetchDonation = async (user_id) => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    setLoading(true);
    try {
      // Create the initial query
      let query = supabase
        .from("blood_donation")
        .select(`*, profile(first_name, last_name)`)
        .eq("donor", user_id)
        .order("schedule_date", { ascending: true });

      // Apply limit for recent donations if required
      if (recentDonation) {
        query = query.limit(1);
      }
      if (activeSched) {
        query = query.gte("schedule_date", today.toISOString());
      }

      const { data, error } = await query;

      if (error) {
        setError(error.message);
      } else {
        setDonationData(recentDonation ? data[0] : data);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { donationData, error, loading, FetchDonation };
};

export default UseFetchDonation;
