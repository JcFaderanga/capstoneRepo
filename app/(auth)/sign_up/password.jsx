import { Text, View } from 'react-native';
import React, { useState } from 'react';
import ThemeButton from '../../../components/UI/button/themeButton';
import InputBox from '../../../components/UI/inputs/inputBox';
import SignUpHeader from '../../../components/signUpHeader';
import usePasswordVisible from '../../../hooks/sign_in_hooks/usePasswordVisible';
import PasswordVisible from '../../../components/sign_in__componets/passwordVisible';
import { useRegistrationStorage } from '../../../hooks/sign_up_hooks/useRegistrationStorage';
import { useRouter } from 'expo-router';

const Password = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ password: '', confirmPassword: '' });
  const router = useRouter();
  const { addDetails } = useRegistrationStorage();

  const { isVisible: firstPass, togglePasswordVisibility: toggleFirstPass } = usePasswordVisible();
  const { isVisible: confirmPass, togglePasswordVisibility: toggleConfirmPass } = usePasswordVisible();

  const validatePassword = () => {
    let validationErrors = {};
  
    if (password.trim() === '') {
      validationErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters long.';
    }
  
    if (confirmPassword.trim() === '') {
      validationErrors.confirmPassword = 'Password confirmation is required.';
    } else if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords don't match!";
    }
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    setErrors({}); // Clear errors if validation passes
    addDetails({ password });
    router.push('./phoneNumber');

  };

  return (
    <View className="bg-white h-full">
      <SignUpHeader text="Create your Password" />

      <View className="mx-auto">
        <InputBox
          value={password}
          onChangeText={setPassword}
          title="Enter Password"
          secureTextEntry={!firstPass}
          autoCapitalize="none"
          customize={{ display: 'none' }} // Remove title of input
          validationError={errors.password}
        />
        <PasswordVisible onPress={toggleFirstPass} isVisible={firstPass} />
      </View>

      <View className="mx-auto">
        <InputBox
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          title="Confirm Password"
          secureTextEntry={!confirmPass}
          autoCapitalize="none"
          customize={{ display: 'none' }} // Remove title of input
          validationError={errors.confirmPassword}
        />
        <PasswordVisible onPress={toggleConfirmPass} isVisible={confirmPass} />
      </View>

      <ThemeButton onPress={validatePassword} title="Continue" />
    </View>
  );
};

export default Password;
