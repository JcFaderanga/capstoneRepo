import {
    Text,
    View,
    SafeAreaView,
} from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useRouter } from 'expo-router';
import CustomBtn from '../../components/button';
import InputBox from '../../components/inputBox';
import SignUpHeader from '../../components/signUpHeader';

const Email = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState({ condition: false, message: '' });

    const router = useRouter();

    const validateEmail = () => {
        if (email.trim() === '') {
            setEmailError({ condition: true, message: 'Field is empty' });
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError({ condition: true, message: 'Invalid email' });
        } else {
            // If email is valid, reset error and navigate to PhoneNumber screen
            setEmailError({ condition: false, message: '' });
            router.push({
                pathname: '../sign_up/password',
                params: { email },
            });
            console.log('Navigating to PhoneNumber with Email:', email);
        }
    };

    return (
        <View>
            <SafeAreaView className="bg-white h-full">
                <SignUpHeader text={`What's your Email`} />
                
                <InputBox
                    keyboardType="email-address"
                    value={email}
                    onChangeText={(emailVal) => {
                        setEmail(emailVal);
                        setEmailError({ condition: false, message: '' }); // Reset error on input change
                    }}
                    title="Enter Email here"
                    borderWidth={emailError.condition ? 2 : 1}
                    borderColor={emailError.condition ? 'red' : '#D9D9D9'}
                    message={emailError}
                />

                <CustomBtn
                    title={'Continue'}
                    onPress={validateEmail} // Call validateEmail when Continue button is pressed
                />
            </SafeAreaView>
            <StatusBar backgroundColor="#F42F47" style="light" />
        </View>
    );
};

export default Email;
