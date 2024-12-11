import { StyleSheet, Text, View } from 'react-native'
import React,{useState, useEffect} from 'react'

const usePasswordValidation = (password) => {
    const [passwordError, setPasswordError] = useState("");

    useEffect(() => {
        if (!password ) {
          setPasswordError("");
        } else if (password.trim()=== '') {
          setPasswordError("Invalid password");
        } else {
          setPasswordError("");
        }
      }, [password]);
    return{passwordError, setPasswordError}
}

export default usePasswordValidation

