import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ForYou from '../screens/MaterialTopTabs/foryou';
import MyDonation from '../screens/MaterialTopTabs/mydonation';
import MyRequest from '../screens/MaterialTopTabs/myrequest';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

const Request = () => {
  return (
    <SafeAreaView className="flex-1 h-full ">
       <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#000000',
        tabBarIndicatorStyle: { backgroundColor: '#F42F47', height: 4, borderRadius: 5 },
        tabBarStyle: { }, 
      }}
    >
      <Tab.Screen name="For You" component={ForYou} />
      <Tab.Screen name="My Request" component={MyRequest} />
      <Tab.Screen name="My Donation" component={MyDonation} />
    </Tab.Navigator>
    </SafeAreaView>
   
  );
}

export default Request;
