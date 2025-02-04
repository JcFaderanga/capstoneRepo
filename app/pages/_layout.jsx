import { Stack } from "expo-router";
import React from "react";

const screenOptions = {
  headerStyle: { backgroundColor: "#F42F47" },
  headerTintColor: "#fff",
  headerTitleAlign: "center",
  headerTitleStyle: { fontWeight: "bold", color: "white" },
};

const customTitles = {
  profile__tab: "Update Profile",
  findDonor: "Find a Donor",
  FAQs: "FAQs",
  setDonation: "Set Appointment",
  viewAppointment: "Appointments",
  webViewAdmin: " ",
  prescreening2: "Pre-Screening",
};

const capitalizeTitle = (title) => {
  return title
    .replace(/_/g, " ")
    .replace(/([A-Z])/g, " $1")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (str) => str.toUpperCase());
};

const getScreenTitle = (screen) =>
  customTitles[screen] || capitalizeTitle(screen);

const _layout = () => {
  const stacks = [
    "profile__tab",
    "findDonor",
    "FAQs",
    "myRequestList",
    "donate",
    "donationSettings",
    "bloodBank",
    "setDonation",
    "prescreening",
    "prescreening2",
    "viewAppointment",
    "createDonationDrive",
    "webViewAdmin",
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
      <Stack.Screen
        name="donationHistory"
        options={{
          title: "Donation History",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "white",
          },
          headerTintColor: "#3D3D3D",
          headerTitleStyle: {
            fontWeight: "bold",
            color: "#3D3D3D",
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen name="donationReview" options={{ headerShown: false }} />
      <Stack.Screen name="bloodTypeInfo" options={{ headerShown: false }} />
      <Stack.Screen name="donationDrive" options={{ headerShown: false }} />
      <Stack.Screen
        name="request_materialtop"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="viewRequest" options={{ headerShown: false }} />
      <Stack.Screen name="FAQsPages" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layout;
