import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

const useFetchSelectedDrive = (sortBy, limit) => {
  const [donationDrive, setDonationDrive] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSelectedDrive = async (drive_id) => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase
        .from("donation_drive")
        .select("*")
        .eq("drive_id", drive_id)
        .single();

      const { data, error } = await query;
      if (error) {
        console.log("donation_drive bad request");
        return;
      }
      console.log("success");
      setDonationDrive(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { donationDrive, loading, error, fetchSelectedDrive };
};

export default useFetchSelectedDrive;
