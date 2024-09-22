import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import SignUpHeader from '../../components/signUpHeader';
import CustomBtn from '../../components/button';
import { router } from 'expo-router';
import { useRouter, useLocalSearchParams } from 'expo-router';

const Gender = () => {
  const [gender, setGender] = useState('');
  const [error, setError] = useState(false); // State to manage error visibility

  const router = useRouter();
  const params = useLocalSearchParams();
  
  const handlePress = () => {
    if (gender === '') {
      // No gender selected, show error message
      setError(true);
      // Optionally show an alert as well
    } else {
      // Gender selected, navigate to the next page
      setError(false); // Hide error message
      console.log(`Selected Gender: ${gender}`);
      router.push({
        pathname: './bloodType',
        params: {...params,gender },
      });
    }
  };

  return (
    <View className="bg-white h-full">
      <SignUpHeader text={`What's your Gender?`} />
      {error && (
        <Text style={styles.errorText}>
          Gender can't be unknown
        </Text>
      )}
      <View className="flex-row justify-center items-center mt-14">
        <TouchableOpacity className="mx-4 mb-10 rounded-[5px]"
          style={ gender === 'Male' && styles.selectedButton}
          onPress={() => setGender('Male')}
        >
          <Image className="w-[95px] h-[95px]" source={require('../../assets/icon/male.png')} />
        </TouchableOpacity>
        <TouchableOpacity className="mx-4 mb-10 rounded-[5px]"
          style={ gender === 'Female' && styles.selectedButton}
          onPress={() => setGender('Female')}
        >
          <Image className="w-[95px] h-[95px]" source={require('../../assets/icon/female.png')} />
        </TouchableOpacity>
      </View>
      <CustomBtn
        title={'Continue'}
        onPress={handlePress}
      />
    </View>
  );
};

// Define styles
const styles = StyleSheet.create({

  selectedButton: {
    backgroundColor: '#ECECEC', 
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default Gender;