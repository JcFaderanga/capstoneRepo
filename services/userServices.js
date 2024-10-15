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

export const getBloodRequest = async (userId)=>{
      const { data, error } = await supabase
        .from('blood_request')
        .select('*')
        .eq('user_id',userId);
      
      if (error) {
        console.log('ERROR FETCHING REQUESTS', error.message);
      } else {
       return (data || []).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      }
}

export const fetchRequests = async ({ bloodTypeFilterResult }) => {
    try {
      let query = supabase.from('blood_request').select('*');
      if (bloodTypeFilterResult && bloodTypeFilterResult.length > 0) {
        query = query.in('blood_type', bloodTypeFilterResult);
      }
  
      const { data: requests, error: requestError } = await query;
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
  
      const sortedRequests = requestsWithNames.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  
      return sortedRequests;
    } catch (error) {
      throw error;
    }
  };


