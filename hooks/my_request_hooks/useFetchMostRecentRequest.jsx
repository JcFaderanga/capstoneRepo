import React,{useState} from "react";
import { supabase } from "../../lib/supabase";
const useFetchMostRecentRequest = () => {
    const [recentRequest, setRecentRequest] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const fetchMostRecentRequest = async (user_id) => {
      setLoading(true); 
      try {
        const { data, error } = await supabase
          .from('blood_request')
          .select('*')
          .eq('user_id', user_id)
          .order('created_at', { ascending: false }) 
          .limit(1); 
  
        if (error) {
          setError(error.message);
        } else {
          setRecentRequest(data[0]); 
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); 
      }
    };

    return { recentRequest, error, loading, fetchMostRecentRequest };
  };
  
  export default useFetchMostRecentRequest;
  