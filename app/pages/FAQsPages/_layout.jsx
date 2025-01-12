import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="aboutApp"
        options={{
          title: "About App",
          headerStyle: {
            backgroundColor: "#F42F47",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "",
          headerTitleStyle: {
            fontWeight: "bold",
            color: "white",
          },
        }}
      />
      <Stack.Screen
        name="aboutDonation"
        options={{
          title: "About Blood Donation",
          headerStyle: {
            backgroundColor: "#F42F47",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "",
          headerTitleStyle: {
            fontWeight: "bold",
            color: "white",
          },
        }}
      />
      <Stack.Screen
        name="beforeDonation"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="amIEligible"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="donationProcess"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default _layout;
