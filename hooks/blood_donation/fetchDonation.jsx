import { useState } from 'react';
import { supabase } from '../../lib/supabase';

const UseFetchDonation = (recent_donation) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [donationData, setDonationData] = useState(null);

  const FetchDonation = async (user_id) => {
    setLoading(true);
    try {
      // Create the initial query
      let query = supabase
        .from('blood_donation')
        .select('*')
        .eq('donor', user_id)
        .order('created_at', { ascending: false });

      // Apply limit for recent donations if required
      if (recent_donation) {
        query = query.limit(1);
      }

      const { data, error } = await query; 
      
      if (error) {
        setError(error.message);
      } else {
        setDonationData(recent_donation ? data[0] : data);
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
