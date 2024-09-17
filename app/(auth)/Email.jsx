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
    const [borderColor, setBorderColor] = useState('#EAEAEA');
    const [borderWidth, setBorderWidth] = useState(1);

    const router = useRouter();

    const handleEmail = () => {
        if (email.trim() === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setBorderColor('red');
            setBorderWidth(2);
        } else {
            setBorderColor('#E6E6E6');
            setBorderWidth(1);
            router.push({
                pathname: '../sign_up/PhoneNumber',
                params: { email }});
            console.log('Sign In button pressed Email',email);
            // Handle sign-in logic here
        }
    };

    return (
        <View>
            <SafeAreaView className="bg-white h-full">
            <SignUpHeader
                text={`What's your Email`}
            />
                <InputBox
                        keyboardType={"email-address"}
                        value={email}
                        onChangeText={(EmailVal) => setEmail(EmailVal)}
                        title="Enter Email here"
                        borderWidth={borderWidth}
                        borderColor={borderColor}
                    />
                <CustomBtn
                    title={'Continue'}
                    onPress={handleEmail}
                />
            </SafeAreaView>
            <StatusBar backgroundColor="#F42F47" style="light" />
        </View>
    );
}

export default Email;
