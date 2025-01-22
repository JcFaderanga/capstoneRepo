import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

const useFetchDonors = () => {
  const [donor, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const blood_types = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const fetchDonors = async ({
    canReceiveFrom,
    typeFilter,
    anonymousFilter,
    selectedTypes,
  }) => {
    console.log(selectedTypes);
    setLoading(true);
    setError(null);
    try {
      let query = supabase
        .from("profile")
        .select("*")
        .in("blood_type", blood_types)
        .is("donation_availability", true);

      if (typeFilter === "Compatible") {
        query = query.in("blood_type", canReceiveFrom);
      } else if (typeFilter === "All") {
        query = query.in("blood_type", blood_types);
      }

      if (anonymousFilter === "true") {
        query = query.eq("anonymous_donor", true);
      } else if (anonymousFilter === "false") {
        query = query.eq("anonymous_donor", false);
      }

      if (selectedTypes.length > 0) {
        query = query.in("blood_type", selectedTypes);
      }

      const { data, error } = await query;
      if (error) {
        throw new Error(error.message);
      }
      setDonors(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { donor, loading, error, fetchDonors };
};

export default useFetchDonors;

const styles = StyleSheet.create({});
