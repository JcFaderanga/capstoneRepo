import { Redirect, Stack, Tabs } from "expo-router";
import { Text, View,Image,TouchableOpacity } from 'react-native'
import { tabsIcon } from '../../constant';
import "../../global.css";
const TabIcon = ({ icon, color}) => {
    return (
      <View className="mt-2 ">
        <Image
          source={icon}
          resizeMode="contain"
          tintColor={color}
          className="w-[26] h-[26]"
        />
      </View>
    );
  };
const _layout = () => {

  const tab = ['home','request', 'notification','profile'];
  return (
     <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#F42F47",
          tabBarInactiveTintColor: "#B3B3B3",
          tabBarShowLabel: true,
          tabBarStyle: {
            width: '100%',
            borderTopWidth: 1,
            borderColor: '#ECECEC',
            height: 60,
          },
        }}
      >
        <Tabs.Screen
            name="home"
            options={{
                title: "Home",
                headerShown: false,
                tabBarIcon: ({ color }) =><TabIcon icon={tabsIcon.home} color={color}/>,
                tabBarButton: (props) => <TouchableOpacity {...props} />,
            }}
            />
          <Tabs.Screen
            name="request"
            options={{
                title: "Request",
                headerShown: false,
                tabBarIcon: ({ color }) =><TabIcon icon={tabsIcon.request} color={color}/>,
                tabBarButton: (props) => <TouchableOpacity {...props} />,
              }}
                />
            <Tabs.Screen
            name="notification"
            options={{
              title: "Notification",
              headerShown: false,
              tabBarIcon: ({ color }) =><TabIcon icon={tabsIcon.notification} color={color}/>,
              tabBarButton: (props) => <TouchableOpacity {...props} />,
            }}
            />
        <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
              headerShown: false,
              tabBarIcon: ({ color }) =><TabIcon icon={tabsIcon.profile} color={color}/>,
              tabBarButton: (props) => <TouchableOpacity {...props} />,
            }}
            />
    </Tabs>
  )
}

export default _layout

