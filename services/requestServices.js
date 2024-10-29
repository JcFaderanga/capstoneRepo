import { supabase } from "../lib/supabase";

export const createPublicRequest = async (request) => {
        const { error,data } = await supabase
          .from('blood_request')
          .insert(request)
          .select()
          .single(); 
          if (error) {
            return { success: false, msg: error.message };
        }
        return { success: true, data };
    };

export const createDirectRequest = async (request) => {
    const { error,data } = await supabase
        .from('blood_request')
        .insert(request)
        .select()
        .single(); 
        if (error) {
        return { success: false, msg: error.message };
    }
    return { success: true, data };
};

export const getBloodRequest = async (userId)=>{
    const { data, error } = await supabase
      .from('blood_request')
      .select('*')
      .eq('user_id',userId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.log('ERROR FETCHING REQUESTS', error.message);
    } else {
     return data;
     // alternative for descending return (data || []).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
}
