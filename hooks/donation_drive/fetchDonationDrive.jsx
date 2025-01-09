import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

const useDonationDrive = (sortBy) => {
  const [donationDrive, setDonationDrive] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDonationDrive = async () => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase.from("donation_drive").select("*");

      if (sortBy === "timePosted") {
        query = query.order("created_at", { ascending: false });
      } else if (sortBy === "eventDate") {
        query = query.order("date", { ascending: false });
      }

      const { data, error } = await query;
      if (error) console.log("success");
      console.log("success");
      setDonationDrive(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonationDrive();
  }, [sortBy]);

  return { donationDrive, loading, error, fetchDonationDrive };
};

export default useDonationDrive;
