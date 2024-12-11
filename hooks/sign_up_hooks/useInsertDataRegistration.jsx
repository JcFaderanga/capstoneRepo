import { StyleSheet, Text, View } from 'react-native'
import React,{useState, useEffect} from 'react'
import { supabase } from '../../lib/supabase'
const useInsertDataRegistration =  () => {
    const [userData, setUserData] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    
    const InsertData =async(userData)=>{ 
      setUserData(data)
     
      setLoading(true)
      const { data: { session, user }, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options:{
          data:{
            first_name:'jc',
            last_name: 'faderanga',
          }
        }
      });
      if (error) {
        setError(error.message)
        console.log("Inserting data Error",error.message)
        return;
      }
      setError(error.message)
      console.log('register success')
    }
  return{isLoading, error, InsertData}
}

export default useInsertDataRegistration

