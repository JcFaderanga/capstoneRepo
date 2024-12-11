import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const useTextValidation = (text) => {
 const [textError, setTextError] = useState('');

 useEffect(()=>{
    if(!text){
        setTextError("");
     }else if(text){
        setTextError("Fields are required");
        return;
     }else if(text){
        setTextError("");
     }else{
        setTextError("");
     }
 },[text])

 return{textError, setTextError}
}

export default useTextValidation

