import { Redirect, Stack, Tabs } from "expo-router";
import { Text, View,Image } from 'react-native'
import { tabsIcon } from '../../constant';


const TabIcon = ({ icon, color}) => {
    return (
      <View className="flex items-center justify-center gap-2">
        <Image
          source={icon}
          resizeMode="contain"
          tintColor={color}
          className="w-[26] h-[26]"
        />
      </View>
    );
  };
const _layout = ({ icon, color, name, focused }) => {

  const tab = ['home','request', 'notification','profile'];
  return (
    <>
     <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#F42F47",
          tabBarInactiveTintColor: "#B3B3B3",
          tabBarShowLabel: false,
          tabBarStyle: {
            width: '100%',
            borderTopWidth: 1,
            borderColor: '#ECECEC',
            height: 65,
          },
        }}
      >
        {/*
            {tab.map((tab)=>{
              <Tabs.Screen
                  name={tab}
                  options={{
                      title: tab,
                      headerShown: false,
                      tabBarIcon: ({ color, focused }) => (
                          <TabIcon
                            icon={tabsIcon.tab}
                            color={color}
                            name="Home"
                            focused={focused}
                          />
                        ),
                  }}
            />
            })
        }*/}
        <Tabs.Screen
            name="home"
            options={{
                title: "Home",
                headerShown: false,
                tabBarIcon: ({ color, focused }) => (
                    <TabIcon
                      icon={tabsIcon.home}
                      color={color}
                      name="Home"
                      focused={focused}
                    />
                  ),
            }}
            />
        <Tabs.Screen
            name="request"
            options={{
                title: "request",
                headerShown: false,
                tabBarIcon: ({ color, focused }) => (
                    <TabIcon
                      icon={tabsIcon.request}
                      color={color}
                      name="Home"
                      focused={focused}
                    />
                  ),
            }}
            />
            <Tabs.Screen
            name="notification"
            options={{
                title: "FAQs",
                headerShown: false,
                tabBarIcon: ({ color, focused }) => (
                    <TabIcon
                      icon={tabsIcon.notification}
                      color={color}
                      name="Home"
                      focused={focused}
                    />
                  ),
            }}
            />
        <Tabs.Screen
            name="profile"
            options={{
                title: "profile",
                headerShown: false,
                tabBarIcon: ({ color, focused }) => (
                    <TabIcon
                      icon={tabsIcon.profile}
                      color={color}
                      name="Home"
                      focused={focused}
                    />
                  ),
            }}
            />
    </Tabs>
    </>
  )
}

export default _layout

