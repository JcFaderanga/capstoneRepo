import { useState, useEffect } from 'react';

const useEmailValidation = (email) => {
  const [emailError, setEmailError] = useState(null);

  //console.log('HOOK: emailVal:', email)
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setEmailError(null);
    } else if (!emailRegex.test(email)) {
      setEmailError("Invalid email format.");
    } else {
      setEmailError(null);
    }
  }, [email]); 

  return { emailError,setEmailError };
};

export default useEmailValidation;
