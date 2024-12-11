import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ThemeButton from '../../../components/UI/button/themeButton';
import InputBox from '../../../components/UI/inputs/inputBox';
import InputBoxDate from '../../../components/UI/inputs/inputBoxDate';
import { useRouter } from 'expo-router';
import SignUpHeader from '../../../components/signUpHeader';
import { useRegistrationStorage } from '../../../hooks/sign_up_hooks/useRegistrationStorage';
import useTextValidation from '../../../hooks/validation/useTextValidation';

const Profile = () => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const { addDetails } = useRegistrationStorage();
  const { textError: firstNameError, setTextError: setFirstNameError } = useTextValidation();
  const { textError: lastNameError, setTextError: setLastNameError } = useTextValidation();
  const { textError: birthDateError, setTextError: setBirthDateError } = useTextValidation();

  const router = useRouter();

  const handleProfile = () => {
    let isValid = true;

    if (!firstName.trim()) {
      setFirstNameError('First name is required!');
      isValid = false;
    } else {
      setFirstNameError('');
    }

    if (!lastName.trim()) {
      setLastNameError('Last name is required!');
      isValid = false;
    } else {
      setLastNameError('');
    }

    if (!birthDate) {
      setBirthDateError('Date of birth is required!');
      isValid = false;
    } else {
      setBirthDateError('');
    }

    if (!isValid) return;

    //convert ISO date to date only 
    const dateOnly = new Date(birthDate).toISOString().slice(0, 10);
    // Store the profile details
    addDetails({
      first_name: firstName.trim(),
      middle_name: middleName.trim(),
      last_name: lastName.trim(),
      birth_date: dateOnly,
    });

    
   
    router.push('./address');
  };

  return (
    <View className="bg-white h-full">
      <ScrollView>
        <SignUpHeader text="What's your Profile Information?" />

        {/* First Name Input */}
        <InputBox
          detail="First Name"
          value={firstName}
          onChangeText={(val) => setFirstName(val)}
          title="Enter First Name"
          validationError={firstNameError}
        />

        {/* Middle Name Input */}
        <InputBox
          detail="Middle Name (optional)"
          value={middleName}
          onChangeText={(val) => setMiddleName(val)}
          title="Enter Middle Name"
          borderWidth={1}
          borderColor="#EAEAEA"
        />

        {/* Last Name Input */}
        <InputBox
          detail="Last Name"
          value={lastName}
          onChangeText={(val) => setLastName(val)}
          title="Enter Last Name"
          validationError={lastNameError}
        />

        {/* Date of Birth Input */}
        <InputBoxDate
          detail="Date of Birth"
          selectedDate={birthDate}
          setSelectedDate={setBirthDate}
          validationError={birthDateError}
        />

        {/* Continue Button */}
        <ThemeButton title="Continue" onPress={handleProfile} />
      </ScrollView>

      <StatusBar backgroundColor="#F42F47" style="light" />
    </View>
  );
};

export default Profile;
