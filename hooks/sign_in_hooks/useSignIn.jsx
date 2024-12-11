import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase';
const useSignIn = () => {
const [isLoading, setLoading] = useState(false);
const [error, setError] = useState(null);

    const SignInWithEmail = async (email, password) => {

        setLoading(true);
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) {
                setError(error.message)
            }
        } catch (e) {
          console.log("HOOK: Sign in failed due to:", e.message);
        } finally {
            setLoading(false);
        }
      };
return {isLoading, error,SignInWithEmail}
}

export default useSignIn
