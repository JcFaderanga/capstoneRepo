import { Text, View, SafeAreaView, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import CustomBtn from '../../components/UI/button/button';
import InputBox from '../../components/UI/inputs/inputBox';
import SignUpHeader from '../../components/signUpHeader';
import { supabase } from '../../lib/supabase';

const Email = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState({ condition: false, message: '' });
    const router = useRouter();

    const validateEmail = async () => {
        if (email.trim() === '') {
            setEmailError({ condition: true, message: 'Field is empty' });
            return; // Exit early if the field is empty
        } 
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError({ condition: true, message: 'Invalid email' });
            return; // Exit early if the email is invalid
        }
        
        try {
            const { data, error } = await supabase
                .from('profile') // Make sure 'profile' is the correct table name
                .select('email')
                .eq('email', email.toLocaleLowerCase());

            if (error) {
                throw new Error(error.message);
            }

            // Check if any emails were returned
            if (data.length > 0) {
                // If data is returned, the email exists
                setEmailError({ condition: true, message: 'Email already exists!' });
                console.log('Email already exists:', email);
            } else {
                // If no data is returned, the email does not exist
                setEmailError({ condition: false, message: '' });
                console.log('Email is available');
                
                // Navigate to the next step
                router.push({
                    pathname: '../sign_up/password',
                    params: { email },
                });
            }
        } catch (error) {
            console.error('Error checking email:', error);
            Alert.alert('Error', 'Something went wrong while checking the email.');
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
                    message={emailError} // Pass the error message directly
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
