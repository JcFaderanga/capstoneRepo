import { StyleSheet, Text, TouchableOpacity, View,Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import ContentTitleButton from '../../components/contentTitle';
import { FAQsIcons, tabsIcon } from '../../constant';
import { useRouter } from 'expo-router'; 
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/authContext';
import {homeIcons} from '../../constant';
const Profile = () => {
  const { setAuth, user } = useAuth();
  const router = useRouter(); 
  
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut(); 
    if (error) {
      console.log('Error during logout:', error);
      return;
    } setAuth(null);
    router.replace('../sign_in');
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'long' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };
  const userCreatedAt = user.created_at; 
  const formattedDate = formatDate(userCreatedAt);
  
  console.log(formattedDate);
  return (
    <View className="w-full h-full bg-white">
      <SafeAreaView>
          <View className="w-full h-[40px] flex-row justify-between items-center bg-primaryRed">
                <View className=" ml-5 ">
                    <Text className="text-2xl font-bold text-primaryRed"></Text>
                </View>
                <View className=" w-auto h-5 mr-5 flex-row">
                      {/** ()=> router.push('../screens/Settings')*/}
                      <TouchableOpacity>
                          <Image className="w-7 h-7 ml-4"
                          style={{tintColor:"white"}}
                                  source={homeIcons.trash}
                              />
                      </TouchableOpacity>
                </View>
            </View>
            <View className="w-full h-[180px] flex  bg-primaryRed">
                <View className="w-full h-[130px] flex-row items-center justify-between">
                    <View className=" ml-6" style={{ elevation: 5, borderRadius: 500,}}>
                        <Image source={require('../../assets/icon/profile.jpg')} 
                                  style={styles.profileImage}
                                  className="bg-white border"
                                  resizeMethod='retain'/>
                    </View>  
                    <View className="float-left  h-full flex-1 ml-5 justify-center">
                      <Text className="float-left text-2xl font-bold text-white">{user && user.first_name + ' '+ user.last_name}</Text>
                      <Text className="float-left text-sm font-bold text-white">ID: {user && user.id}</Text>
                    </View>
                </View>
                <View className="w-full h-[35] flex-1 flex-row items-center justify-between px-4">
                  <View className="flex-row items-center">
                  <Image source={require('../../assets/icon/calendar.png')} className="w-4" resizeMode='contain'/>
                    <Text className="text-white text-[11px]"> {user && formattedDate}</Text>
                    </View>
                    <View className="flex-row">
                        <Text className="text-white mx-3 text-sm">
                          <Text className="text-base font-bold">20 </Text>
                          Following
                        </Text>
                        <Text className="text-white text-sm">
                          <Text className="text-base font-bold">20 </Text>
                          Follower
                        </Text>
                    </View>
                </View>
            </View>
            
        {user ? (
          <ContentTitleButton
            title={user.last_name || "User"} // Display last name or fallback to "User"
            size={{ width: 27, height: 25 }}
            icon={FAQsIcons.aboutApp}
            onPress={handleLogout} // Call handleLogout on press
          />
        ) : (
          <Text>Loading...</Text> // Display a loading or fallback message if no user is available
        )}
      </SafeAreaView>
    </View>
  );
};

export default Profile;
const styles = StyleSheet.create({
  profileImage: {
    width: 110,
    height: 110,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 500,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 20, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 10, // For a rounded image
  },
});