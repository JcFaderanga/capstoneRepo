import React, { useState } from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import CustomBtn from '../../../components/UI/button/button';
import InputBox from '../../../components/UI/inputs/inputBox';
import InputBoxDate from '../../../components/UI/inputs/inputBoxDate';
import { useRouter, useLocalSearchParams } from 'expo-router';
import SignUpHeader from '../../../components/signUpHeader';

const Profile = () => {
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState('');

    const [firstNameError, setFirstNameError] = useState({ condition: false, message: '' });
    const [lastNameError, setLastNameError] = useState({ condition: false, message: '' });
    const [birthDateError, setBirthDateError] = useState({ condition: false, message: '' });

    const router = useRouter();
    const params = useLocalSearchParams();
    ;
    console.log("DOB: ",birthDate);

    const handleProfile = () => {
        let allFieldsFilled = true;
        console.log("date when submit: ",birthDate)
        // First name validation
        if (firstName.trim() === '') {
            setFirstNameError({ condition: true, message: 'First name is required' });
            allFieldsFilled = false;
        } else {
            setFirstNameError({ condition: false, message: '' });
        }

        // Last name validation
        if (lastName.trim() === '') {
            setLastNameError({ condition: true, message: 'Last name is required' });
            allFieldsFilled = false;
        } else {
            setLastNameError({ condition: false, message: '' });
        }

        // Birth date validation
        if (birthDate === '') {
            setBirthDateError({ condition: true, message: 'Invalid Date of Birth' });
            allFieldsFilled = false;
        } else {
            setBirthDateError({ condition: false, message: '' });
        }

        if (allFieldsFilled) {
            router.push({
                pathname: './address',
                params: {
                    ...params,
                    firstName,
                    middleName,
                    lastName,
                    birthDate,
                },
            });
        }
    };

    return (
        <View>
            <SafeAreaView className="bg-white h-full">
                <ScrollView>
                    <SignUpHeader text={`What's your Profile Information?`} />

                    <InputBox
                        detail="First Name:"
                        value={firstName}
                        onChangeText={(val) => {
                            setFirstName(val);
                            if (val.trim() !== '') setFirstNameError({ condition: false, message: '' });
                        }}
                        title="Enter your Firstname here"
                        borderWidth={firstNameError.condition ? 2 : 1}
                        borderColor={firstNameError.condition ? 'red' : '#EAEAEA'}
                        message={firstNameError}
                    />

                    <InputBox
                        detail="Middle Name (optional):"
                        value={middleName}
                        onChangeText={(val) => setMiddleName(val)}
                        title="Enter your MiddleName here"
                        borderWidth={1}
                        borderColor={'#EAEAEA'}
                    />

                    <InputBox
                        detail="Last Name:"
                        value={lastName}
                        onChangeText={(val) => {
                            setLastName(val);
                            if (val.trim() !== '') setLastNameError({ condition: false, message: '' });
                        }}
                        title="Enter your LastName here"
                        borderWidth={lastNameError.condition ? 2 : 1}
                        borderColor={lastNameError.condition ? 'red' : '#EAEAEA'}
                        message={lastNameError}
                    />

                    <InputBoxDate
                        detail="Date of Birth:" 
                        selectedDate={birthDate} // Pass birthDate as prop
                        setSelectedDate={setBirthDate} // Pass setBirthDate to update state
                        borderWidth={birthDateError.condition ? 2 : 1}
                        borderColor={birthDateError.condition ? 'red' : '#EAEAEA'}
                        message={birthDateError}
                    />
 
                    <CustomBtn title={'Continue'} onPress={handleProfile} />
                </ScrollView>
            </SafeAreaView>
            <StatusBar backgroundColor="#F42F47" style="light" />
        </View>
    );
};

export default Profile;
