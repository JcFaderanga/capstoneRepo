import { ScrollView, Text, View } from 'react-native';
import { useState } from 'react';
import React from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import CustomBtn from '../../../components/button';
import InputBox from '../../../components/inputBox';
import InputBoxNum from '../../../components/inputBoxNum';
import { SafeAreaView } from 'react-native-safe-area-context';

const Create = () => {
    const params = useLocalSearchParams();

    // Initialize state with params values
    const [number, setPhoneNumber] = useState(params.number || '');
    const [email, setEmail] = useState(params.email || '');
    const [firstName, setFirstName] = useState(params.firstName || '');
    const [middleName, setMiddleName] = useState(params.middleName || '');
    const [lastName, setLastName] = useState(params.lastName || '');
    const [birthDate, setBirthDate] = useState(params.birthDate || '');
    const [borderColor, setBorderColor] = useState('gray');
    const [borderWidth, setBorderWidth] = useState(2);

    const handleSubmit = () => {
        // You can handle the submission logic here
        console.log('Phone Number:', number);
        console.log('Email:', email);
        console.log('First Name:', firstName);
        console.log('Middle Name:', middleName);
        console.log('Last Name:', lastName);
        console.log('Birth Date:', birthDate);
    };

    return (
            <ScrollView>
                <View className="w-full h-full p-4 bg-white">
                    <View className="w-full h-[100] flex justify-center items-center">
                        <Text className="text-customgray text-xl font-interRegularBold">
                            Almost done!
                        </Text>
                        <Text>Check if everything is correct.</Text>
                    </View>
                    <InputBoxNum
                        detail="Phone No."
                        value={number}
                        onChangeText={(e) => setPhoneNumber(e)}
                        keyboardType="numeric"
                        title="Enter your phone number here"
                        borderWidth={borderWidth}
                        borderColor={borderColor}
                    />
                    <InputBox
                        detail="Email"
                        value={email}
                        onChangeText={(val) => setEmail(val)}
                        keyboardType="email-address"
                        title="Enter your email here"
                        borderWidth={borderWidth}
                        borderColor={borderColor}
                    />
                    <InputBox
                        detail="First Name"
                        value={firstName}
                        onChangeText={(val) => setFirstName(val)}
                        keyboardType="default"
                        title="Enter your first name here"
                        borderWidth={borderWidth}
                        borderColor={borderColor}
                    />
                    <InputBox
                        detail="Middle Name"
                        value={middleName}
                        onChangeText={(val) => setMiddleName(val)}
                        keyboardType="default"
                        title="Enter your middle name here"
                        borderWidth={borderWidth}
                        borderColor={borderColor}
                    />
                    <InputBox
                        detail="Last Name"
                        value={lastName}
                        onChangeText={(val) => setLastName(val)}
                        keyboardType="default"
                        title="Enter your last name here"
                        borderWidth={borderWidth}
                        borderColor={borderColor}
                    />
                    <InputBox
                        detail="Birth Date"
                        value={birthDate}
                        onChangeText={(val) => setBirthDate(val)}
                        keyboardType="default"
                        title="Enter your birth date here"
                        borderWidth={borderWidth}
                        borderColor={borderColor}
                    />
                    <CustomBtn
                        title="Submit"
                        onPress={handleSubmit}
                    />
                </View>
            </ScrollView>
    );
};

export default Create;
