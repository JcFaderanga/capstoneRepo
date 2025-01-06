import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';

const UseFetchDonation = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [donationData, setDonationData] = useState(null); 

  const FetchDonation = async (user_id) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blood_donation')
        .select('*')
        .eq('donor', user_id)
        .order('created_at', { ascending: false }) ;

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

export default UseFetchDonation;
