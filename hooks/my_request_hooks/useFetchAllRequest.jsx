import { useState } from 'react';
import { supabase } from '../../lib/supabase';

const useFetchAllRequest = () => {
  const [allRequest, setAllRequestData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAllRequest = async (user_id) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blood_request')
        .select('*')
        .eq('user_id', user_id)
        .order('created_at', { ascending: false }) ;
      if (error) {
        setError(error.message);
      } else {
        setAllRequestData(data); 
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); 
    }
  };

  return { allRequest, error, loading, fetchAllRequest };
};

export default useFetchAllRequest;
