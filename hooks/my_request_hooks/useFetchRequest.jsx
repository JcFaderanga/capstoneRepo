import { useState } from 'react';
import { supabase } from '../../lib/supabase';

const useFetchRequest = () => {
  const [request, RequestData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRequest = async (request_id) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blood_request')
        .select('*')
        .eq('blood_request_id', request_id)
        .single();

      if (error) {
        setError(error.message);
      } else {
        RequestData(data); 
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); 
    }
  };

  return { request, error, loading, fetchRequest };
};

export default useFetchRequest;
