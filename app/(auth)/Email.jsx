import { Text, View, StatusBar, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import ThemeButton from '../../components/UI/button/themeButton';
import InputBox from '../../components/UI/inputs/inputBox';
import SignUpHeader from '../../components/signUpHeader';
import { supabase } from '../../lib/supabase';
import { useRegistrationStorage } from '../../hooks/sign_up_hooks/useRegistrationStorage';
import useEmailValidation from '../../hooks/validation/useEmailValidation';

const Email = () => {
  const [email, setEmail] = useState('');
  const { emailError, setEmailError } = useEmailValidation(email);
  const { addDetails } = useRegistrationStorage();
  const router = useRouter();

  const validateEmail = async () => {
    if(email.trim()=== ''){
        setEmailError('Email is required!')
        return;
    }

    if(emailError) return;

    try {
      // Check if the email already exists in the database
      const { data, error } = await supabase
        .from('profile')
        .select('email')
        .eq('email', email.toUpperCase());

      if (error) throw new Error(error.message);

      if (data.length > 0) { 
        setEmailError('Email is already in used!');
      } else {
        // Save the email in uppercase and proceed
        const emailToUpperCase = email.toUpperCase();
        addDetails({ email: emailToUpperCase });
        router.push('sign_up/password');
      }
    } catch (err) {
      Alert.alert('Error', err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <View className="bg-white h-full flex">
      <SignUpHeader text={`What's your Email?`} />
      <InputBox
        keyboardType="email-address"
        value={email}
        onChangeText={(val) => setEmail(val)}
        title="Enter Email here"
        customize={{ display: 'none' }}
        validationError={emailError}
      />

      <ThemeButton title="Continue" onPress={validateEmail} />

      <StatusBar backgroundColor="#F42F47" style="light" />
    </View>
  );
};

export default Email;
