import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image } from 'react-native';
import { TimeAgo } from '../../constant/timeStamp';
import { fetchRequests } from '../../services/userServices';
import RequestBox from './requestBox';

const ProfileList = ({ bloodTypeFilterResult }) => {
  const [requestList, setRequestList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const requests = await fetchRequests({ bloodTypeFilterResult });
        setRequestList(requests);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    fetchData();
  }, [bloodTypeFilterResult]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const requests = await fetchRequests({ bloodTypeFilterResult });
      setRequestList(requests);
    } catch (err) {
      setError(err.message);
    }
    setRefreshing(false);
  };

  if (loading) return <ActivityIndicator size="large" color="#F42F47" />;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View className="h-full">
      {requestList.length === 0 ? (
        <View className="flex-1 items-center">
           <Image source={require('../../assets/icon/noRequestFound.png')} resizeMode="contain" className="w-64"/>
        </View>
      ) : (
        <FlatList
          className="h-full w-full"
          data={requestList}
          keyExtractor={(item) => item.blood_request_id.toString()}
          renderItem={({ item }) => (
            <RequestBox
              name={item.userName}
              description={item.description}
              bloodType={item.blood_type}
              units={item.units}
              anonymous={item.anonymous}
              timePosted={TimeAgo(item.created_at)}
            />
          )}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      )}
      
    </View>
  );
};

export default ProfileList;
