import { useState } from 'react';
import { supabase } from '../../lib/supabase';

const useFetchRequestCount = () => {
  const [count, setCount] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRequestCount = async (user_id) => {
    setLoading(true);
    try {
      const { count, error } = await supabase
        .from('blood_request')
        .select('user_id', { count: 'exact' })
        .eq('user_id', user_id);
      
      if (error) {
        setError(error.message);
      } else {
        setCount(count); 
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); 
    }
  };

  return { count, error, loading, fetchRequestCount };
};

export default useFetchRequestCount;
