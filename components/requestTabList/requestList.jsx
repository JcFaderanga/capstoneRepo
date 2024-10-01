// ProfileList.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { supabase } from '../../lib/supabase';
import RequestBox from './requestBox';

const ProfileList = () => {
  const [requestList, setRequestList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh

  const fetchRequests = async () => {
    setLoading(true); // Set loading state
    const { data: requests, error: requestError } = await supabase
      .from('blood_request')
      .select('*'); // Fetch all columns

    if (requestError) {
      setError(requestError.message);
      setLoading(false);
      return;
    }

    // Fetch users based on the unique user_ids from requests
    const uniqueUserIds = [...new Set(requests.map(request => request.user_id))];
    const { data: users, error: userError } = await supabase
      .from('profile')
      .select('id, first_name, last_name')  // Fetch id, first_name, and last_name
      .in('id', uniqueUserIds);   // Filter by user IDs

    if (userError) {
      setError(userError.message);
      setLoading(false);
      return;
    }

    // Create a mapping of user IDs to names
    const userMap = {};
    users.forEach(user => {
      userMap[user.id] = {
        firstName: user.first_name, // Map user ID to first name
        lastName: user.last_name,   // Map user ID to last name
      };
    });

    // Combine requests with user names and sort them by created_at date
    const requestsWithNames = requests.map(request => {
      const user = userMap[request.user_id] || { firstName: 'Unknown', lastName: '' };
      return {
        ...request,
        userName: `${user.firstName} ${user.lastName}` // Combine first name and last name
      };
    });

    // Sort requests by created_at date in descending order
    const sortedRequests = requestsWithNames.sort((a, b) => new Date(b.create_at) - new Date(a.create_at));

    setRequestList(sortedRequests);
    setLoading(false);
  };

  // Fetch requests when component mounts
  useEffect(() => {
    fetchRequests();
  }, []);

  // Function to handle refreshing
  const handleRefresh = async () => {
    setRefreshing(true); // Set refreshing state
    await fetchRequests(); // Re-fetch requests
    setRefreshing(false); // Reset refreshing state
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View>
      <FlatList
        data={requestList}
        keyExtractor={(item) => item.blood_request_id.toString()}
        renderItem={({ item }) => (
          <RequestBox
            name={item.userName}  // Use the full name (first + last)
            description={item.description}
            bloodType={item.blood_type}
            units={item.units}
            anonymous={item.anonymous}
          />
        )}
        refreshing={refreshing} // Set refreshing state
        onRefresh={handleRefresh} // Handle refresh action
      />
    </View>
  );
};

export default ProfileList;
