import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase';

const useFetchDonors = () => {
const [donor, setDonors] = useState();
const [loading, setLoading] = useState(false);
const [error, setError] = useState(false);

    const fetchDonors = async (blood_type) => {
      setLoading(true); 
      setError(null); 
      try {
        const { data, error } = await supabase
          .from('profile')
          .select('*')
          .in('blood_type', blood_type)
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

  return {donor,loading,error, fetchDonors}

}

export default useFetchDonors

const styles = StyleSheet.create({})