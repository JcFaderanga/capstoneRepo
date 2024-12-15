import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase';

const useFetchDonors = () => {
const [donor, setDonors] = useState();
const [loading, setLoading] = useState(false);
const [error, setError] = useState(false);

useEffect(() => {
    const fetchDonors = async () => {
      setLoading(true); 
      setError(null); 
      try {
        const { data, error } = await supabase
          .from('profile')
          .select('*')
          .is('donation_availability', true);

        if (error) {
          throw new Error(error.message);
        }
        setDonors(data);
      } catch (e) {
        setError(e.message); 
      } finally {
        setLoading(false); 
      }
    };
    fetchDonors();
  }, []);

  return {donor,loading,error}

}

export default useFetchDonors

const styles = StyleSheet.create({})