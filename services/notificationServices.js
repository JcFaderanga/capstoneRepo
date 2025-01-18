import { supabase } from "../lib/supabase";

export const createNotification = async ({notification}) => {
 // console.log('request ',request)
 console.log('notification',notification)
  try{
      const { error,data } = await supabase
      .from('notification')
      .insert(notification)
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
