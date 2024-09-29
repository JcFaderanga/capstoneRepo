import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import ContentTitleButton from '../../components/contentTitle';
import { FAQsIcons, tabsIcon } from '../../constant';
import { router } from 'expo-router';
import { supabase } from '../../lib/supabase';
import {useAuth } from '../../context/authContext';
const Settings = () => {
  const { setAuth} = useAuth();
 

  return (
    <View className="w-full h-full bg-white">
      <SafeAreaView>
        <ContentTitleButton
          title={"Notifications"}
          size={{ width: 27, height: 25, tintColor: '#F42F47'}}
          icon={tabsIcon.notification}
         
        />
      </SafeAreaView>
    </View>
  );
}

export default Settings;
