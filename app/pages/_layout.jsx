import { Stack } from 'expo-router';
import React from 'react';

const screenOptions = {
  headerStyle: { backgroundColor: '#F42F47' },
  headerTintColor: '#fff',
  headerTitleAlign: 'center',
  headerTitleStyle: { fontWeight: 'bold', color: 'white' },
};

const customTitles = {
  profile__tab: "Update Profile",
  findDonor: "Find a Donor",
  FAQs: "FAQs",
};

const capitalizeTitle = (title) => {
  return title
    .replace(/_/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^./, (str) => str.toUpperCase());
};

const getScreenTitle = (screen) => customTitles[screen] || capitalizeTitle(screen);

const _layout = () => {
  const stacks = [
    'profile__tab',
    'findDonor',
    'FAQs',
    'myRequestList',
    'donate',
    'donationHistory',
    'donationSettings',
    'bloodBank',
    'donationDrive',
  ];

  return (
    <Stack>
      {stacks.map((screen) => (
        <Stack.Screen
          key={screen}
          name={screen}
          options={{
            title: getScreenTitle(screen),
            ...screenOptions,
          }}
        />
      ))}
      <Stack.Screen name="donationReview" options={{ headerShown: false }} />
      <Stack.Screen name="request_materialtop" options={{ headerShown: false }} />
      <Stack.Screen name="viewRequest" options={{ headerShown: false }} />
      <Stack.Screen name="FAQsPages" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layout;
