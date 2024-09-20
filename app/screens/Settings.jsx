import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import ContentTitleButton from '../../components/contentTitle';
import { FAQsIcons, tabsIcon } from '../../constant';

import { router } from 'expo-router';
import { supabase } from '../../lib/supabase';

const Settings = () => {
 
 const handleLogout = async () => {   
  
  try {
    //const { data } = await supabase.auth.getSession();
    //console.log('this before logout',data.session);
    console.log('this before logout');
    await supabase.auth.signOut();
    //console.log('Successfully logged out');
    

    // Navigate to the sign-in screen after logout
   router.push('../(auth)/sign_in');
  } catch (error) {
    console.error('An unexpected error occurred during logout:', error); // Log unexpected errors
  }
};


  return (
    <View className="w-full h-full bg-white">
      <SafeAreaView>
        <ContentTitleButton
          title={"Notifications"}
          size={{ width: 27, height: 25, tintColor: '#F42F47'}}
          icon={tabsIcon.notification}
         
        />
        <ContentTitleButton
          title={"Logout"}
          size={{ width: 27, height: 25 }}
          icon={FAQsIcons.aboutApp}
          onPress={handleLogout}
        />
      </SafeAreaView>
    </View>
  );
}

export default Settings;
