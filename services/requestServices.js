import { supabase } from "../lib/supabase";

export const createPublicRequest = async (request) => {
 // console.log('request ',request)
  try{
      const { error,data } = await supabase
      .from('blood_request')
      .insert(request)
      .select()
      .single(); 
      if (error) {
        console.log(error.message)
        return { success: false, msg: error.message };
    }
    return { success: true, data };
  }catch(e){
    console.log(e.message)
  }
   
};

export const fetchRecentRequest = async (recentRequestId) => {
  console.log('SERVICES fetchRecentRequest', recentRequestId)
  if(!recentRequestId) return;
   try{
       const { error,data } = await supabase
       .from('blood_request')
       .select('*')
       .eq('blood_request_id', recentRequestId)
       .single(); 
       if (error) {
         console.log(error.message)
         return { success: false, msg: error.message };
     }
     return data ;
   }catch(e){
     console.log('SERVICES fetchRecentRequest error',e.message)
   }
    
 };
