import { supabase } from "../lib/supabase";

export const createPublicRequest = async (request) => {
  console.log('request ',request)
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
