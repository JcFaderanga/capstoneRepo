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

export const fetchRequests = async ({ bloodTypeFilterResult }, typeFilter, anonymousFilter, compatibility, limit = 10) => {
  const allType = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  try {
    // Get data only if public and approved
    let query = supabase.from('blood_request').select('*').eq('public_request', true); 

    if (bloodTypeFilterResult && bloodTypeFilterResult.length > 0) {
      // If filterRequest !empty will return list of selected types
      query = query.in('blood_type', bloodTypeFilterResult);
    }

    if (typeFilter === true) {
      query = query.in('blood_type', compatibility.canDonateTo);
    } else if (typeFilter === 'All') {
      query = query.in('blood_type', allType);
    }

    if (anonymousFilter === true) {
      query = query.eq('anonymous', true);
    } else if (anonymousFilter === 'not') {
      query = query.eq('anonymous', false);
    }

    const { data: requests, error: requestError } = await query.limit(limit).order('created_at', { ascending: false });

    if (requestError) {
      throw new Error(requestError.message);
    }

    const uniqueUserIds = [...new Set(requests.map(request => request.user_id))];
    const { data: users, error: userError } = await supabase
      .from('profile')
      .select('id, first_name, last_name, gender')
      .in('id', uniqueUserIds);

    if (userError) {
      throw new Error(userError.message);
    }

    const userMap = {};
    users.forEach(user => {
      userMap[user.id] = { firstName: user.first_name, lastName: user.last_name, gender: user.gender };
    });

    const requestsWithNames = requests.map(request => {
      const user = userMap[request.user_id] || { firstName: 'Unknown', lastName: '', gender: 'Unknown' };
      return { 
        ...request, 
        userName: `${user.firstName} ${user.lastName}`,
        userGender: user.gender // Add gender to the result
      };
    });

    return requestsWithNames;
  } catch (error) {
    throw error;
  }
};



