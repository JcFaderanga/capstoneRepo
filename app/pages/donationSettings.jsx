import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import ToggleButton from "../../components/UI/button/toggleBtn";
import { useAuth } from "../../context/authContext";
import { supabase } from "../../lib/supabase";

const DonationSettings = () => {
  const [availability, setAvailability] = useState(false);
  const [anonymous, setAnonymous] = useState(false);
  const [contacts, setContacts] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state
  const { user } = useAuth();

  // Fetch data when component loads or user changes
  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        setLoading(true); // Start loading
        const { data, error } = await supabase
          .from("profile")
          .select("donation_availability, anonymous_donor, public_contact")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error fetching data:", error);
        } else {
          setAvailability(data.donation_availability);
          setAnonymous(data.anonymous_donor);
          setContacts(data.public_contact);
        }
        setLoading(false); // End loading
      };

      fetchData();
    }
  }, [user]);

  const handleDonorAvailability = async (val) => {
    if (user.blood_type === "--") {
      console.log("Invalid blood type");
      return setAvailability(false);
    }
    const { error } = await supabase
      .from("profile")
      .update({ donation_availability: val })
      .eq("id", user.id);

    if (error) {
      console.error("Error updating availability:", error);
      setAvailability(!val);
    } else {
      setAvailability(val);
    }
  };

  const handleAnonymousDonor = async (val) => {
    const { error } = await supabase
      .from("profile")
      .update({ anonymous_donor: val })
      .eq("id", user.id);

    if (error) {
      console.error("Error updating anonymous donor status:", error);
      setAnonymous(!val);
    } else {
      setAnonymous(val);
    }
  };

  const handleContact = async (val) => {
    const { error } = await supabase
      .from("profile")
      .update({ public_contact: val })
      .eq("id", user.id);

    if (error) {
      console.error("Error updating contact visibility:", error);
      setContacts(!val);
    } else {
      setContacts(val);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="red" />
        <Text className="text-gray-500 mt-4">Loading settings...</Text>
      </View>
    );
  }

  return (
    <View className="h-full w-full bg-white">
      <View className="w-full h-28 bg-slate-100 px-6 my-1 flex-row items-center">
        <View className="flex-1">
          <Text className="font-bold text-lg">Available to Donate</Text>
          <Text>Set your availability status for donations.</Text>
        </View>
        <ToggleButton
          AlertTitle="Available to Donate"
          AlterDescription="Turning this on will display your profile in the donor list."
          onPress={handleDonorAvailability}
          status={availability}
        />
      </View>

      <View className="w-full h-28 bg-slate-100 px-6 my-1 flex-row items-center">
        <View className="flex-1">
          <Text className="font-bold text-lg">Show Contacts</Text>
          <Text>Share your contact details with recipients.</Text>
        </View>
        <ToggleButton
          AlertTitle="Show Contact"
          AlterDescription="Allow recipients to reach out to you directly."
          onPress={handleContact}
          status={contacts}
        />
      </View>

      <View className="w-full h-28 bg-slate-100 px-6 my-1 flex-row items-center">
        <View className="flex-1">
          <Text className="font-bold text-lg">Anonymous Donor</Text>
          <Text>Donate without revealing your identity.</Text>
        </View>
        <ToggleButton
          AlertTitle="Anonymous Donor"
          AlterDescription="Hide your name and profile in the donor list."
          onPress={handleAnonymousDonor}
          status={anonymous}
        />
      </View>
    </View>
  );
};

export default DonationSettings;

const styles = StyleSheet.create({});
