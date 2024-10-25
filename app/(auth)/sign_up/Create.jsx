import { ScrollView, Text, View,Alert } from 'react-native';
import { useState } from 'react';
import React from 'react';
import { useRouter, useLocalSearchParams, router } from 'expo-router'
import CustomBtn from '../../../components/UI/button/button'
import InputBox from '../../../components/UI/inputs/inputBox'
import InputBoxNum from '../../../components/UI/inputs/inputBoxNum'
import { SafeAreaView } from 'react-native-safe-area-context'
import { supabase } from '../../../lib/supabase'
import { useAuth } from '../../../context/authContext';
import { getUserData } from '../../../services/userServices';
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
    const [street, setStreet] = useState(params.street ||'')
    const [region, set] = useState(params.regionName ||'')
    const [province, setProvince] = useState(params.provinceName ||'')
    const [city,setCity ] = useState(params.cityName ||'')
    const [barangay, setBarangay] = useState(params.barangay ||'')
    const [borderColor, setBorderColor] = useState('gray');
    const [borderWidth, setBorderWidth] = useState(2);
    const [isLoading, setLoading] = useState(false);

    const { setAuth, setUserData } = useAuth();
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
        const { error: profileError } = await supabase
          .from('profile')
          .insert([
            { 
                user_id: user.id,  
                email: email,
                first_name: firstName,
                middle_name: middleName,
                last_name: lastName,
                address:{
                    street:street,
                    region:region,
                    province:province,
                    city:city,
                    barangay:barangay,
                },
                birth_date: birthDate, 
                gender: gender,
                blood_type: bloodType,
                phone_number: number
            }
          ]);
        if (profileError) {
          Alert.alert("ERROR INSERTING PROFILE:",profileError.message);
        }
         let res = await getUserData(session?.user?.id);
        if(res.success) setUserData(res?.data);
        setAuth(session?.user);
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