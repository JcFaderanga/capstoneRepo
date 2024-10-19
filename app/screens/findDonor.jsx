import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Elevated from '../../components/elevated';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/authContext';

const DonorBox = ({ name , id , anonymous}) => {
  const {user} = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const [bgColor, setBgColor] = useState('');
 const  [donorName, setName] = useState(name)
  useEffect(() => {
    if (user && user.id === id) {
      setBgColor('#FFEFF1'); 
      setName('You');  
    } else {
      setBgColor('#FFFFFF');  
      setName(anonymous?"Anonymous":name);   
    }
  }, [user, id, name]);
 
  
  return (
    <Pressable className="w-11/12 h-24 mx-auto my-2">
      <Elevated width={'100%'} height={'100%'}>
        <View className="flex-1 flex-row justify-between items-center px-6 marker:rounded-[10px]"
        style={{backgroundColor:bgColor}}>
          <View className="flex-row items-center">
            <Image
              source={anonymous?require('../../assets/icon/anonymouseIcon.png'):require('../../assets/icon/profilePic.jpg')}
              resizeMode="contain"
              className="w-14 h-14 rounded-full"
            />
            <View className="px-3 w-40">
              <Pressable onPress={() => setIsExpanded(!isExpanded)}>
                <Text
                  className="text-base font-bold"
                  numberOfLines={isExpanded ? null : 1}
                  ellipsizeMode="tail"
                >
                  {donorName}
                </Text>
              </Pressable>
              <Text className="text-[12px] leading-[13px] text-gray-500">
               ID: {anonymous? "- - - - - - - - - -":id}
              </Text>
            </View>
          </View>
          <Text className="text-primaryRed text-3xl font-bold">AB+</Text>
        </View>
      </Elevated>
    </Pressable>
  );
};

const FindDonor = () => {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    const getDonor = async () => {
      try {
        const { data, error } = await supabase
          .from('profile')
          .select('*')
          .eq('donation_availability', true);
        if (error) {
          console.log('Error fetching data', error.message);
        } else {
          setDonors(data); 
        }
      } catch (e) {
        console.log('Error fetching available donor', e);
      }
    };
    getDonor();
  }, []);

  return (
    <View className="bg-white flex-1">
      {donors.map((donor) => (
        <DonorBox key={donor.id} id={donor.id}  name={donor.first_name+' '+donor.last_name} anonymous={donor.anonymous_donor}/>
      ))}
    </View>
  );
};

export default FindDonor;

const styles = StyleSheet.create({});
