import { ScrollView, Text, View,Alert } from 'react-native';
import { useState } from 'react';
import React from 'react';
import { useRouter, useLocalSearchParams, router } from 'expo-router';
import CustomBtn from '../../components/button';
import InputBox from '../../components/inputBox';
import InputBoxNum from '../../components/inputBoxNum';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/authContext';

const Create = () => {
    const params = useLocalSearchParams();

    // Initialize state with params values
    const [number, setPhoneNumber] = useState(params.number || '');
    const [email, setEmail] = useState(params.email || '');
    const [password, setPassword] = useState(params.password || '');
    const [firstName, setFirstName] = useState(params.firstName || '');
    const [middleName, setMiddleName] = useState(params.middleName || '');
    const [lastName, setLastName] = useState(params.lastName || '');
    const [birthDate, setBirthDate] = useState(params.birthDate || '');
    const [gender, setGender] = useState(params.gender || '');
    const [bloodType, setBloodType] = useState(params.bloodType || '');
    const [borderColor, setBorderColor] = useState('gray');
    const [borderWidth, setBorderWidth] = useState(2);
    const [isLoading, setLoading] = useState(false);

    const { setAuth, setUserData } = useAuth;
      signUpWithEmail =async()=> {
        console.log('Phone Number:', number);
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('First Name:', firstName);
        console.log('Middle Name:', middleName);
        console.log('Last Name:', lastName);
        console.log('Birth Date:', birthDate);
        console.log('Blood Type:', bloodType);
        setLoading(true); 
        const { data: { session, user }, error } = await supabase.auth.signUp({
          email: email,
          password: password,
        });
        if (error) {
            console.log("ERROR INSERTING EMAIL AND PASS:",error);
          Alert.alert("ERROR INSERTING EMAIL AND PASS:",error.message);
          return;
        }
        // const updateUserData = async (user) => {
        //     let res = await getUserData(user?.id);
        //     console.log('APP/_LAYOUT :: get user data:', res);
        //     if(res.success) setUserData(res.data);
        //   };
        
        const { error: profileError } = await supabase
          .from('profile')
          .insert([
            { 
                user_id: user.id,  
                first_name: firstName,
                middle_name: middleName,
                last_name: lastName,
                birth_date: birthDate, 
                gender: gender,
                blood_type: bloodType,
                phone_number: number
            }
          ]);
        if (profileError) {
          Alert.alert("ERROR INSERTING PROFILE:",profileError.message);
        }
        setAuth(session?.user);
        console.log("SESSION AFTER SIGN UP:",session?.user);
         let res = await getUserData(session?.user?.id);
        if(res.success) setUserData(res.data);
        setLoading(false); 
      }
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
                        detail="Password"
                        value={password}
                        onChangeText={(val) => setPassword(val)}
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
                    <InputBox
                        detail="Gender"
                        value={gender}
                        onChangeText={(val) => setGender(val)}
                        keyboardType="default"
                        title="Enter your birth date here"
                        borderWidth={borderWidth}
                        borderColor={borderColor}
                    />
                    <InputBox
                        detail="Blood Type"
                        value={bloodType}
                        onChangeText={(val) => setBloodType(val)}
                        keyboardType="default"
                        title="Enter your birth date here"
                        borderWidth={borderWidth}
                        borderColor={borderColor}
                    />
                    <CustomBtn
                        title="Submit"
                        onPress={signUpWithEmail}
                        isLoading={isLoading}
                    />
                </View>
            </ScrollView>
    );
};

export default Create;
