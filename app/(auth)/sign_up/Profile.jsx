import {
    Text,
    View,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import CustomBtn from '../../../components/button';
import InputBox from '../../../components/inputBox';
import InputBoxDate from '../../../components/inputBoxDate';
import { useRouter, useLocalSearchParams } from 'expo-router';

const Profile = () => {
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState('');

    const [firstNameBorderColor, setFirstNameBorderColor] = useState('#EAEAEA');
    const [lastNameBorderColor, setLastNameBorderColor] = useState('#EAEAEA');
    const [birthDateBorderColor, setBirthDateBorderColor] = useState('#EAEAEA');
    const [borderWidth, setBorderWidth] = useState(1);

    const router = useRouter();
    const params = useLocalSearchParams();

    const handleProfile = () => {
        let allFieldsFilled = true;

        if (firstName.trim() === '') {
            setFirstNameBorderColor('red');
            setBorderWidth(2);
            allFieldsFilled = false;
        } else {
            setFirstNameBorderColor('#EAEAEA');
        }

        if (lastName.trim() === '') {
            setLastNameBorderColor('red');
            setBorderWidth(2);
            allFieldsFilled = false;
        } else {
            setLastNameBorderColor('#EAEAEA');
        }

        if (birthDate.trim() === '') {
            setBirthDateBorderColor('#EAEAEA');
            setBorderWidth(2);
            allFieldsFilled = false;
        } else {
            setBirthDateBorderColor('#EAEAEA');
        }

        if (allFieldsFilled) {
            router.push({
                pathname: './Create',
                params: { 
                    ...params, 
                    firstName,
                    middleName,
                    lastName, 
                    birthDate
                },
            });
        }
    };

    return (
        <View>
            <SafeAreaView className="bg-white h-full">
                <ScrollView>
                    <View>
                        <View className="w-full h-[100] flex justify-center items-center">
                            <Text className="text-customgray text-xl font-interRegularBold">
                                What's your profile information?
                            </Text>
                        </View>
                        <InputBox
                            detail="FirstName:"
                            value={firstName}
                            onChangeText={(val) => setFirstName(val)}
                            keyboardType=""
                            title="Enter your Firstname here"
                            borderWidth={borderWidth}
                            borderColor={firstNameBorderColor}
                        />
                        <InputBox
                            detail="MiddleName (optional):"
                            value={middleName}
                            onChangeText={(val) => setMiddleName(val)}
                            keyboardType=""
                            title="Enter your MiddleName here"
                            borderWidth={borderWidth}
                            borderColor={'#EAEAEA'} // Optional field, no need to validate
                        />
                        <InputBox
                            detail="LastName:"
                            value={lastName}
                            onChangeText={(val) => setLastName(val)}
                            keyboardType=""
                            title="Enter your LastName here"
                            borderWidth={borderWidth}
                            borderColor={lastNameBorderColor}
                        />
                        <InputBoxDate
                            detail="Date of Birth:"
                            value={birthDate}
                            onChangeText={(val) => setBirthDate(val)}
                            keyboardType="numeric"
                            title="MM/DD/YYYY"
                            borderWidth={borderWidth}
                            borderColor={birthDateBorderColor}
                        />
                        <CustomBtn
                            title={'Continue'}
                            onPress={handleProfile}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
            <StatusBar backgroundColor="#F42F47" style="light" />
        </View>
    );
}

export default Profile;
