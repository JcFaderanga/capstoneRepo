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
    let query = supabase.from('blood_request').select(`
      *,profile(
          first_name, last_name, gender
        )
      `).eq('public_request', true); 

    if (bloodTypeFilterResult && bloodTypeFilterResult.length > 0) {
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

    const { data: requests_data, error: requestError } = await query.limit(limit).order('created_at', { ascending: false });

    if (requestError) {
      throw new Error('request API error', requestError.message);
    }

    // Iterate through the requests and check blood donations
    const updatedRequests = [];

    for (let request of requests_data) {
      const { blood_request_id, units } = request;

      // Fetch donations related to the current blood request
      const { data: donation_data, error: donationError } = await supabase
        .from('blood_donation')
        .select('units_donated')
        .eq('blood_request_id', blood_request_id);

      if (donationError) {
        throw new Error( donationError.message);
      }

      const totalDonated = donation_data.reduce((sum, donation) => sum + donation.units_donated, 0);

      if (totalDonated < units) {
        updatedRequests.push({ ...request, remaining_units: units - totalDonated });
      }
    }

    return updatedRequests;

  } catch (error) {
    throw error;
  }
};

