import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { supabase } from '../../lib/supabase';
const UseSaveDonation = () => {
 const [error, setError] = useState(null);
 const [loading, setLoading] = useState(null);

const InsertDoation =async(data)=>{
    setLoading(true);

    try{
        const { error,data: donation_data } = await supabase
        .from('blood_donation')
        .insert(data)
        .select()
        .single(); 
        if(error) console.log('error')
    }catch(e){
        setError(e);
        
    }
   
    setLoading(false)
}

return {error, loading, InsertDoation}

}

export default UseSaveDonation
