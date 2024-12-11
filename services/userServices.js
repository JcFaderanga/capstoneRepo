import { supabase } from "../lib/supabase";

export const getUserData = async (userId) => {
    try {
        const { data, error } = await supabase
            .from('profile')
            .select()
            .eq('user_id', userId)
            .single();
        if (error) {
            return { success: false, msg: error.message };
        }
        return { success: true, data };  // Return the data if no error
        
    } catch (e) {
        return { success: false, msg: e.message };  // Return correct error message
    }
    
}
export const getProfile = async (userId )=>{
  const { data, error } = await supabase
    .from('profile')
    .select('*')
    .eq('id',userId) 
    .single();
  if (error) {
    console.log('ERROR FETCHING REQUESTS', error.message);
  } else {
   return data ;
  }
}

export const fetchRequests = async ({ bloodTypeFilterResult }, limit=10) => {
    try {
      let query = supabase.from('blood_request').select('*').eq('public_request', true); //get data only if public
      if (bloodTypeFilterResult && bloodTypeFilterResult.length > 0) {
        query = query.in('blood_type', bloodTypeFilterResult);//if filterRequest !empty will return list of selected type
      }
      const { data: requests, error: requestError } = await 
        query.limit(limit).order('created_at', { ascending: false });;//if filterRequest is empty will set list to all 
        
      if (requestError) {
        throw new Error(requestError.message);
      }
  
      const uniqueUserIds = [...new Set(requests.map(request => request.user_id))];
      const { data: users, error: userError } = await supabase
        .from('profile')
        .select('id, first_name, last_name')
        .in('id', uniqueUserIds);
  
      if (userError) {
        throw new Error(userError.message);
      }
  
      const userMap = {};
      users.forEach(user => {
        userMap[user.id] = { firstName: user.first_name, lastName: user.last_name };
      });
  
      const requestsWithNames = requests.map(request => {
        const user = userMap[request.user_id] || { firstName: 'Unknown', lastName: '' };
        return { ...request, userName: `${user.firstName} ${user.lastName}` };
      });
  
      //const sortedRequests = requestsWithNames.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  
      return requestsWithNames;
    } catch (error) {
      throw error;
    }
  };


