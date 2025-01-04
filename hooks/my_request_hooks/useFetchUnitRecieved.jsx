import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import { supabase } from '../../lib/supabase';

const UseFetchUnitRecieved = () => {
  const [unitRecieved, setUnitRecieved] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchUnitRecieved = async (user_id) => {

      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('blood_donation')
          .select('units_donated')
          .eq('recipient', user_id);
        
        if (error) {
          setError(error.message);
        } else {
          const totalRecieved = data.reduce((sum, item) => sum + (item.units_donated || 0), 0);
          setUnitRecieved(totalRecieved); 
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); 
      }
    };
  
    return { unitRecieved, error, loading, fetchUnitRecieved };
  };

export default UseFetchUnitRecieved

const styles = StyleSheet.create({})