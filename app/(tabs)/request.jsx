import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Foryou from '../pages/request_materialtop/foryou';
import Mydonation from '../pages/request_materialtop/mydonation';
import Myrequest from '../pages/request_materialtop/myrequest';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

const Request = () => {
  return (
    <SafeAreaView className="flex-1 h-full ">
       <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#ffffff',
        tabBarIndicatorStyle: { backgroundColor: '#F42F47', height: 4, borderRadius: 5 },
        tabBarStyle: { 
          backgroundColor: '#F42F47',
        }, 
        tabBarLabelStyle: { 
          fontSize: 16, // Adjust font size here
          fontWeight: 'bold', // Optional for bold text
        },
      }}
    >
      <Tab.Screen name="For You" component={Foryou} />
      <Tab.Screen name="My Request" component={Mydonation} />
      <Tab.Screen name="My Donation" component={Myrequest} />
    </Tab.Navigator>
    </SafeAreaView>
   
  );
}

export default Request;
